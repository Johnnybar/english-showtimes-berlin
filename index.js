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
// var csurf = require('csurf');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const api = require('./api.js');
const CircularJSON = require('circular-json');
var moment = require('moment');
moment().format();


////////////////////////
// react-engine options
// var engineOptions = {
//     // optional, if not using react-router
//     reactRoutes: 'PATH_TO_REACT_ROUTER_ROUTE_DECLARATION'
// };
//
// // set `react-engine` as the view engine
// app.engine('.jsx', engine.server.create(engineOptions));
//
// // set the view directory
// app.set('views', __dirname + '/public/views');
//
// // set js as the view engine
// app.set('view engine', 'jsx');
//
// // finally, set the custom react-engine view for express
// app.set('view', engine.expressView);


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
app.use(cookieSession({
    secret: 'my super secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./public'));
// app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken');
    next();
});

///BASIC SERVER DELIVERY REQUESTS

app.get('/', function(req, res){
    // if (!req.session.user) {
    //     res.redirect('/welcome/');
    // } else {
    // res.sendFile(__dirname + '/index.html');
    res.redirect('/welcome/');
    // }
});

// THIS DISABLES THE handlebars BUT NEEDED TO AVOID URL TYPO ERRORS!!!!!

app.get('/welcome/', function(req, res){
    db.getUserSessionId('')
        .then((result)=>{

            req.session.user = { id: result[0].id};
            db.updateSessionIdWhereSerial(req.session.user.id);
        });
    res.sendFile(__dirname + '/index.html');

});

app.get('/getCinemasByArea/:area', function(req,res){
///BEGIN SESSION AND CREATE TABLE FOR USER SESSION:
    // db.getUserSessionId('')
    //     .then((result)=>{
    //
    //         req.session.user = { id: result[0].id};
    //         console.log('this is req session user id: ', req.session.user.id);
    //         db.updateSessionIdWhereSerial(req.session.user.id);
    //     });

    const area = req.params.area;
    //DB QUERY TO GET LIST
    db.getCinemasByArea(area)
        .then((results)=>{
            res.json(results);

        });

});

app.post('/addToSaved/:cinemaId', (req,res)=>{
    db.addToSaved(req.session.user.id, req.params.cinemaId);
});

app.get('/getSavedCinemas', (req,res)=>{
    db.getSavedCinemas(req.session.user.id).then((results)=>{
        var cinemas = results.slice(1);
        console.log('these are cinemas:', cinemas);
        let cinemaArr=[];
        for (var i = 0; i < cinemas.length; i++) {
            cinemaArr.push(cinemas[i].selected);
        }
        // console.log('this is cinemaArr: ', cinemaArr);
        // var newCinemaArr = cinemaArr.join();
        // console.log('this is newCinemaArr: ', newCinemaArr);
        db.getCinemasInfoForSaved(cinemaArr).then((result)=>{
            res.json(result);
        });
        // for (var i = 0; i < cinemas.length; i++) {
        //     db.getCinemasInfoForSaved(cinemas[i].selected).then((results)=>{
        //         cinemaArr.push(results);
        //     });
        // }

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

app.get('*', function(req, res){

    res.sendFile(__dirname + '/index.html');

});

////SOCKET OPTIONS

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});


/////SERVER LISTEN

app.listen(8080, function() {
    console.log("I'm listening.");
});
