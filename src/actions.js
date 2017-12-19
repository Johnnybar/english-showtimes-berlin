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

let movieArr =[];//DISPATCH ORIGINALLY WITH SHOWTIMES IN IT
export const getMoviesInfo = function(movieId) {
    return axios.get('/getMoviesInfo/'+ movieId).then((results)=>{
        // console.log('this is results of getMoviesInfo action ', results.data.data.movie);
        var movieObj={
            title: results.data.data.movie.title,
            id: results.data.data.movie.id,
            poster: results.data.data.movie.poster_image.image_files[0].url,
            synopsis: results.data.data.movie.synopsis
        };
        // console.log('this is movieObj: ', movieObj);
        // movieArr.push(movieObj);
        //
        // showtimes.map(eachShow=>{
        //     for (var i = 0; i < showtimes.length; i++) {
        //         if(eachShow.movie_id === movieObj.id){
        //             showtimes[i].poster=movieArr[i].poster;
        //         }
        //     }
        //
        //     // if(eachShow.movie_id === movieObj.id){
        //     //     showtimes.push(movieObj.poster);
        //     //
        //     // }
        //     console.log('this is new showtimes: ', showtimes);
        // });

        // console.log('this is movie.movie_id: ', movie.movie_id );
        // return(
        // movie.movie_id=== movieObj.id);
        // );

        // showtimes.push(newMovieArr);
        // console.log('this is new movie arr: ', newMovieArr);



        movieArr.push(movieObj);
        return {
            type:'GET_MOVIE_IDS',
            movieArr: movieArr
        };
    });

};
