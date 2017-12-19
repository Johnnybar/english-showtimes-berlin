// import React from 'react';

export default function(state = {}, action) {

    if (action.type == 'GET_CINEMAS') {
        state = Object.assign({}, state, {
            cinemas: action.cinemas
        });
    }
    // if (action.type == 'GET_SHOWTIMES') {
    //     state = Object.assign({}, state, {
    //         showtimes: action.showtimes
    //     });
    // }

    if (action.type == 'GET_SHOWTIMES') {
        console.log('this is action showtimes:  ',action.showtimes);
        state = Object.assign({}, state, {
            showtimes: action.showtimes
        });
    }



    if (action.type == 'GET_MOVIE_IDS') {

        state = Object.assign({}, state, {
            movieArr: action.movieArr
            // showtimes: state.showtimes.showtimes.map(movie=>{
            //     if (movie.movie_id== action.movieArr.id){
            //         console.log('helllooo');
            //     }
            // })
            // showtimes.map(movie=>{
            //    if(movie.movie_id ==action.movieObj.id){
            //        console.log('hello');
            //        // return Object.assign({}, state,{
            //
            // });
            // }
            // })
        });
    }


    return state;
}
