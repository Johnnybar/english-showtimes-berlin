var axios = require('axios');

let myAxios = axios.create({
    hostname: 'api.cinepass.de',
    port: '443',
    method: 'GET',
    headers: {
        'X-API-Key': 'b1sXUyc70WHFa9rRwMlA8AsCkxxto5Tb'
    }
});

exports.getShowtimesInfo = function(cinemaId) {
    return myAxios.get('https://api.internationalshowtimes.com/v4/showtimes', {

        params: {
            cinema_id: cinemaId,
            all_fields: true,
            min_poster_image_width: 500
        }
    });
};

exports.getMoviesInfo = function(movieId) {
    return myAxios.get('https://api.internationalshowtimes.com/v4/movies/' + movieId);
};

exports.getSpecificMovieInfo = function(movieTitle) {

    return axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=40d1ba3&t=' + movieTitle);

};
