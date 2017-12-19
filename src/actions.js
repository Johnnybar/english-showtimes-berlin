import React from 'react';
import axios from './axios';

export const getAllCinemas = function(areaId) {
    console.log('in actions');
    return axios.get('/getCinemasByArea/'+ areaId).then((results)=>{
        console.log('this is results.data ', results.data);
        return {
            type:'GET_CINEMAS',
            cinemas:results.data
        };
    });

};

let firstResult;
export const getShowtimesInfo = function(cinemaId) {
    return axios.get('/getShowtimesInfo/'+ cinemaId).then((results)=>{
        var showtimesArray =results.data.data;

        var obj = {};
        showtimesArray.showtimes.forEach(movie => {
            obj[movie.movie_id] = obj[movie.movie_id] || { 'movie_id' : movie.movie_id, 'start_at' : [], 'cinema_movie_title':movie.cinema_movie_title, 'language': movie.language };
            obj[movie.movie_id].start_at = obj[movie.movie_id].start_at.concat(movie.start_at);
        });
        firstResult =  Object.keys(obj).map(value => obj[value]);
        var noGermanMovies = firstResult.filter(movie=>
            movie.language ==='en'
        );
        console.log('this is the original result of showtimes array: ', firstResult);
        console.log('this is noGermanMovies: ', noGermanMovies);


        return {
            type:'GET_SHOWTIMES',
            showtimes:noGermanMovies
        };
    });

};

// let movieArr =[];//DISPATCH ORIGINALLY WITH SHOWTIMES IN IT
export const getMoviesInfo = function(movieId) {
    return axios.get('/getMoviesInfo/'+ movieId).then((results)=>{
        var newResults= results.data.data.movie;
        console.log('this is new Results', newResults);
        //
        var movieObj={
            title: newResults.original_title,
            id: newResults.id,
            poster: newResults.poster_image.image_files[0].url,
            synopsis: newResults.synopsis,
            thumbnail: newResults.poster_image_thumbnail



        };


        return {
            type:'GET_MOVIE_INFO',
            movieObj: movieObj,
            movieId: movieId
        };
    });



};
