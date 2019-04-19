const express = require('express');
const app = express();
const compression = require('compression');
const cookieParser = require('cookie-parser');
var db = require('./config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
var csurf = require('csurf');
const api = require('./api.js');
const CircularJSON = require('circular-json');
const imdb = require('imdb-api');


///Multer and disk storage
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        }).catch((err) => {
            console.log(err);
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

////App uses

app.use(compression());
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require("cookie-session")({
    secret: process.env.COOKIE_SESSION_KEY || "mySecret",
  // the key is used to verify the signature
    maxAge: 1000 * 60 * 60 * 24
}));
app.use(express.static('./public'));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

///Basic server delivery requests

app.get('/', function(req, res) {
    res.redirect('/welcome/');

});

app.get('/welcome/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});

app.get('/getCinemasByArea/:area', function(req, res) {
    const area = req.params.area;
    db.getUserSessionId('').then((result) => {
        if (result) {
            req.session.user = {
                id: result[0].id
            };
            // console.log('this is req.session.user in area page: ', req.session.user.id);
            db.updateSessionIdWhereSerial(req.session.user.id);
        }
    }).catch((err) => {
        console.log(err);
    });
  //DB query to get list
    db.getCinemasByArea(area).then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
    });

});

app.get('/addToSaved/:cinemaId', (req, res) => {
    // console.log('this is req.session in addToSaved: ', req.session.user);
    db.addToSaved(req.session.user.id, req.params.cinemaId);
});

app.get('/getCinemaInfo/:cinemaId', (req, res) => {

    db.getCinemaInfo(req.params.cinemaId).then((result) => {
        // console.log('this is getCinemaInfo; ', result);
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/deleteFromSaved/:apiId', (req, res) => {
    db.deleteFromSaved(req.session.user.id, req.params.apiId).then(() => {
        db.getSavedCinemas(req.session.user.id).then((resultWithEmptyElement) => {
            var results = resultWithEmptyElement.slice(1);
            let newCinemaArr = [];
            for (var i = 0; i < results.length; i++) {
                newCinemaArr.push(results[i].selected);
            }
            db.getCinemasInfoForSaved(newCinemaArr).then((result) => {
                res.json(result);
            });
        });
    }).catch((err) => {
        console.log(err);
    });

});
app.get('/getSavedCinemas', (req, res) => {
    db.getSavedCinemas(req.session.user.id).then((results) => {
        var cinemas = results.slice(1);
        let cinemaArr = [];
        for (var i = 0; i < cinemas.length; i++) {
            cinemaArr.push(cinemas[i].selected);
        }
        db.getCinemasInfoForSaved(cinemaArr).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/getShowtimesInfo/:cinemaId', function(req, res) {
    const cinemaId = req.params.cinemaId;
    api.getShowtimesInfo(cinemaId).then((results) => {
        let json = CircularJSON.stringify(results);
        var showtimes = JSON.parse(json);
        res.json(showtimes);
    }).catch(function(err) {
        console.log(err);
    });

});

app.get('/getMoviesInfo/:movieId', function(req, res) {
    const movieId = req.params.movieId;
    api.getMoviesInfo(movieId).then(results => {
        let json = CircularJSON.stringify(results);
        var movieResults = JSON.parse(json);
        res.json(movieResults);
    }).catch(function(err) {
        console.log(err);
    });

});

app.get('/getSpecificMovieInfo/:movieTitle', (req, res) => {
    const movieTitle = req.params.movieTitle;
    api.getSpecificMovieInfo(movieTitle).then((results) => {
        // console.log('this is specific movie result: ', results.data);
        var movieResults = results.data;
        res.json(movieResults);
    }).catch((err) => {
        console.log(err);
    });

});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/logout', ((req, res) => {
    req.logOut();
    res.redirect('/welcome/');

}));

app.listen(process.env.PORT || 8080);
