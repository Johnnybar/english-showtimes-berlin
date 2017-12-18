var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
var dbUrl;
const bucket = require('./config.json');

if (process.env.DATABASE_URL){
    dbUrl = process.env.DATABASE_URL;
}
else{
    var userInfo = require('../secrets.json');
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
