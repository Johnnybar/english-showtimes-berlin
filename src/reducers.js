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

        state = Object.assign({}, state, {
            showtimes: action.showtimes
        });
    }



    if (action.type == 'GET_MOVIE_INFO') {

        state = Object.assign({}, state, {
            showtimes: state.showtimes.map(showtime=>{
                if (showtime.movie_id == action.movieId){
                    return Object.assign({}, showtime, action.movieObj);
                }
                return showtime;
            })
        // movieArr: action.movieArr
        });
    }
    console.log('this is state: ', state);

    return state;
}
