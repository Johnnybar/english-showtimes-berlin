var spicedPg = require('spiced-pg');
let dbUrl;

if (process.env.DATABASE_URL){
    dbUrl = process.env.DATABASE_URL;
}
else{
    var userInfo = require('./secrets.json');
    var user = userInfo.username;
    var pass = userInfo.password;
    dbUrl = `postgres:${user}:${pass}psql@localhost:5432/showtimes`;
}
var db = spicedPg(dbUrl);

// const PENDING = 1, ACCEPTED = 2, CANCELED = 3, TERMINATED = 4, REJECTED = 5;

/////////////////////////////////////////REGISTRATION QUERIES///////////////////////////////////////

exports.getCinemasByArea = function(area) {
    return db.query(
        'SELECT * from cinemas WHERE area =($1)',
        [area]
    ).then((results) => {
        return results.rows;
    }).catch((err) => {
        return err;
    });
};


///THESE TWO QUERIES CREATE A ROW, FIRST ONE CREATES IT, SECOND ONE USES THE SERIAL KEY TO UPDATE THE USER ID,
//TO ALLOW MULTIPLE ROWS OF SELECTIONS WITH SAME USER ID
exports.getUserSessionId =function(defaultSelected) {
    return db.query(
        'INSERT INTO users (selected) VALUES ($1) returning id',
        [defaultSelected]
    ).then((results) => {
        return results.rows;
    }).catch((err)=>{
        console.log(err);
    });
};


exports.updateSessionIdWhereSerial =function( id) {
    return db.query(
        `UPDATE users
        SET user_id =($1)
        WHERE id =($1)`,
        [id]
    ).then((results) => {
        return results.rows;
    }).catch((err)=>{
        console.log(err);
    });
};

//////ADD CINEMA TO SAVED LIST
exports.addToSaved =function(userId, cinemaId) {
    return db.query(
        'INSERT INTO users (user_id, selected) VALUES ($1, $2)',
        [userId, cinemaId]
    ).then((results) => {
        return results.rows;
    }).catch((err)=>{
        console.log(err);
    });
};

//GET SAVED CINEMAS
exports.getSavedCinemas = function( user_id){
    return db.query(
        'SELECT selected FROM users WHERE user_id =($1)',
        [user_id]
    ).then((results) => {
        return results.rows;
    }).catch((err) => {
        console.log(err);
    });
};

///GET CINEMA INFO FOR Saved
exports.getCinemasInfoForSaved = function(cinemaArr) {
    return db.query(
        'SELECT * FROM cinemas  WHERE api_id = ANY ($1)',
        [cinemaArr]
    ).then((results) => {
        return results.rows;
    }).catch((err) => {
        return err;
    });
};

///DELETE CINEMA FROM Saved

exports.deleteFromSaved = function(reqId, selectedId){
    return db.query(
        'DELETE from users WHERE user_id = $1 and selected= $2',
        [reqId, selectedId]
    ).then(() => {
        console.log('deleted saved cinema');
    }).catch((err) => {
        console.log(err);
    });
};

///GET CINEMA INFO FOR ONECINEMA PAGE

exports.getCinemaInfo = function(cinemaId) {
    return db.query(
        'SELECT * from cinemas WHERE api_id =($1)',
        [cinemaId]
    ).then((results) => {
        return results.rows;
    }).catch((err) => {
        return err;
    });
};
