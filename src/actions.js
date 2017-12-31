import React from 'react';
import axios from './axios';

export const getAllCinemas = function(areaId) {
    // console.log('in actions');
    return axios.get('/getCinemasByArea/'+ areaId).then((results)=>{
        // console.log('this is results.data ', results.data);
        return {
            type:'GET_CINEMAS',
            cinemas:results.data
        };
    }).catch((err)=>{
        console.log(err);
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
        // console.log('this is the original result of showtimes array: ', firstResult);
        // console.log('this is noGermanMovies: ', noGermanMovies);


        return {
            type:'GET_SHOWTIMES',
            showtimes:noGermanMovies
        };
    }).catch((err)=>{
        console.log(err);
    });

};

// let movieArr =[];//DISPATCH ORIGINALLY WITH SHOWTIMES IN IT
export const getMoviesInfo = function(movieId) {
    // console.log('this is movie id in getMoviesInfo: ',movieId);
    return axios.get('/getMoviesInfo/'+ movieId).then((results)=>{
        var newResults= results.data.data.movie;
        // console.log('this is new Results', newResults);
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
    }).catch((err)=>{
        console.log(err);
    });



};

export const getCinemasForSaved = function(newCinemaArr) {

    return {
        type:'GET_CINEMAS_FOR_SAVED',
        cinemasForSaved:newCinemaArr.data
    };


};

export const deleteSingleCinema = function(cinemaArrAfterDelete) {
    // console.log('this is cinemaArrAfterDelete', cinemaArrAfterDelete);
    return {
        type:'DELETE_CINEMA_GET_NEW_ARRAY',
        cinemaArrAfterDelete:cinemaArrAfterDelete.data
    };


};

export const setCinemaInfo = function(cinemaInfo) {
    return {
        type:'SET_CINEMA_INFO',
        cinemaInfo:cinemaInfo.data[0]
    };


};

export const setSearchResults = function(movieInfo) {
    // console.log('this is movieInfo: ', movieInfo);
    return {
        type:'SET_SEARCH_RESULTS',
        movieInfo:movieInfo
    };


};
