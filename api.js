var axios = require('axios');



let myAxios = axios.create({
    hostname: 'api.cinepass.de',
    port: '443',
    method: 'GET',
    headers: {
        'X-API-Key': 'b1sXUyc70WHFa9rRwMlA8AsCkxxto5Tb'
    }
});

exports.getShowtimesInfo = function(cinemaId){
    return myAxios.get('https://api.internationalshowtimes.com/v4/showtimes', {

        params: {
            cinema_id: cinemaId,
            all_fields: true,
            min_poster_image_width:500,
        },
    });
};

exports.getMoviesInfo = function(movieId){
    return myAxios.get('https://api.internationalshowtimes.com/v4/movies/'+ movieId);
};

exports.getSpecificMovieInfo = function(movieTitle){

    return myAxios.get('http://theapache64.com/movie_db/search?keyword='+ movieTitle);

};




// export function getMoviesInfo(){
//
//     myAxios.get('https://api.cinepass.de/v4/showtimes', {
//         cinema_id: cinemaId
//     });
//
// }
// export default function api (){
//     (function(callback) {
//         'use strict';
//
//         const httpTransport = require('https');
//         const responseEncoding = 'utf8';
//         const httpOptions = {
//             hostname: 'api.cinepass.de',
//             port: '443',
//             path: '/v4/showtimes/?cinema_id=267',
//             method: 'GET',
//             headers: {"X-API-Key":"b1sXUyc70WHFa9rRwMlA8AsCkxxto5Tb"}
//         };
//         httpOptions.headers['User-Agent'] = 'node ' + process.version;
//
//         // Paw Store Cookies option is not supported
//
//         const request = httpTransport.request(httpOptions, (res) => {
//             let responseBufs = [];
//             let responseStr = '';
//
//             res.on('data', (chunk) => {
//                 if (Buffer.isBuffer(chunk)) {
//                     responseBufs.push(chunk);
//                 }
//                 else {
//                     responseStr = responseStr + chunk;
//                 }
//             }).on('end', () => {
//                 responseStr = responseBufs.length > 0 ?
//                     Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
//
//                 callback(null, res.statusCode, res.headers, responseStr);
//             });
//
//         });
//
//         request.write("");
//         request.end();
//
//
//     })((error, statusCode, headers, body) => {
//
//         console.log('ERROR:', error);
//         console.log('STATUS:', statusCode);
//         console.log('HEADERS:', JSON.stringify(headers));
//         console.log('BODY:', JSON.parse(body));
//         var newBody = JSON.parse(body);
//         return newBody;
//     });
// }
