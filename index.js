const express = require('express');
const app = express();
// const hb = require ('express-handlebars');
const compression = require('compression');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var db = require('./config/db');
const bodyParser = require('body-parser');
const s3 = require('./s3');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
var csurf = require('csurf');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const api = require('./api.js');
const CircularJSON = require('circular-json');
const imdb = require('imdb-api');

////////////
///MULTER AND DISK STORAGE
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

////APP USES
// app.engine('handlebars', hb());
// app.set('view engine', 'handlebars');
app.use(compression());
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use(cookieParser());
app.use(cookieSession({
    secret: 'my super secret',
    maxAge: 1000 * 60 * 60 * 24 * 14,

}));


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


///BASIC SERVER DELIVERY REQUESTS

app.get('/', function(req, res){

    // } else {
    // res.sendFile(__dirname + '/index.html');
    res.redirect('/welcome/');
    // }
});

// THIS DISABLES THE handlebars BUT NEEDED TO AVOID URL TYPO ERRORS!!!!!

app.get('/welcome/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    db.getUserSessionId('')
        .then((result)=>{
            req.session.user = { id: result[0].id};
            console.log('this is req.session.user in area page: ', req.session.user );
            db.updateSessionIdWhereSerial(req.session.user.id);
        });

});

app.get('/getCinemasByArea/:area', function(req,res){

    const area = req.params.area;
    //DB QUERY TO GET LIST
    db.getCinemasByArea(area)
        .then((results)=>{
            res.json(results);

        });

});

app.get('/getCinemaInfo/:cinemaId', (req,res)=>{

    db.getCinemaInfo(req.params.cinemaId).then((result)=>{
        res.json(result);
    });

});

app.get('/addToSaved/:cinemaId', (req,res)=>{
    console.log('this is req.session in addToSaved: ', req.session);
    db.addToSaved(req.session.user.id, req.params.cinemaId);


});

app.post('/deleteFromSaved/:apiId', (req,res)=>{
    db.deleteFromSaved(req.session.user.id, req.params.apiId)
        .then(()=>{
            db.getSavedCinemas(req.session.user.id).then((resultWithEmptyElement)=>{
                var results= resultWithEmptyElement.slice(1);
                let newCinemaArr=[];
                for (var i = 0; i < results.length; i++) {
                    newCinemaArr.push(results[i].selected);
                }
                db.getCinemasInfoForSaved(newCinemaArr).then((result)=>{
                    res.json(result);
                });
            });

        });

});
app.get('/getSavedCinemas', (req,res)=>{
    db.getSavedCinemas(req.session.user.id).then((results)=>{
        var cinemas = results.slice(1);
        console.log('these are cinemas:', cinemas);
        let cinemaArr=[];
        for (var i = 0; i < cinemas.length; i++) {
            cinemaArr.push(cinemas[i].selected);
        }

        db.getCinemasInfoForSaved(cinemaArr).then((result)=>{
            res.json(result);
        });


    });
});


app.get('/getShowtimesInfo/:cinemaId', function(req,res){
    const cinemaId = req.params.cinemaId;
    //RUN AXIOS REQ FROM API
    console.log('in app getShowtimesInfo');
    api.getShowtimesInfo(cinemaId)
        .then((results)=>{
            let json = CircularJSON.stringify(results);
            var showtimes= JSON.parse(json);
            res.json(showtimes);
        }).catch(function(err){
            console.log(err);
        });

});

app.get('/getMoviesInfo/:movieId', function(req,res){
    const movieId = req.params.movieId;
    // console.log('this is movieId: ', movieId);
    //RUN AXIOS REQ FROM API
    api.getMoviesInfo(movieId)
        .then(results=>{
            let json = CircularJSON.stringify(results);
            var movieResults = JSON.parse(json);
            res.json(movieResults);
        }).catch(function(err){
            console.log(err);
        });

});

app.get('/getSpecificMovieInfo/:movieTitle', (req,res)=>{
    // console.log('this is req params in indexjs: ', req.params);
    const movieTitle = req.params.movieTitle;

    api.getSpecificMovieInfo(movieTitle)
        .then((results)=>{
            console.log('this is specific movie result: ',results.data.data);
            var movieResults = results.data.data;
            res.json(movieResults);
        }).catch((err)=>{
            console.log(err);
        });

});

app.get('*', function(req, res){

    res.sendFile(__dirname + '/index.html');

});

app.get('/logout', ((req,res)=>{
    req.logOut();
    res.redirect('/welcome/');

}));

//SOCKET OPTIONS

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});


/////SERVER LISTEN

// var port = process.env.PORT || 5000;
// app.listen(port, "0.0.0.0", function() {
//     console.log("Listening on Port 3000");
// });

app.listen(process.env.PORT || 3000);
