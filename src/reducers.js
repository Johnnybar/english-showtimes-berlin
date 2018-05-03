

export default function(state = {}, action) {

    if (action.type == 'GET_CINEMAS') {
        state = Object.assign({}, state, {
            cinemas: action.cinemas
        });
    }

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
                return showtime
            })
        })
    }


    if (action.type == 'GET_CINEMAS_FOR_SAVED') {

        state = Object.assign({}, state, {
            cinemasForSaved: action.cinemasForSaved
        });
    }

    if (action.type == 'DELETE_CINEMA_GET_NEW_ARRAY') {

        state = Object.assign({}, state, {
            cinemasForSaved: action.cinemaArrAfterDelete
        });
    }

    if (action.type == 'SET_CINEMA_INFO') {

        state = Object.assign({}, state, {
            cinemaInfo: action.cinemaInfo
        });
    }

    if (action.type == 'SET_SEARCH_RESULTS') {

        state = Object.assign({}, state, {
            movieInfo: action.movieInfo
        });
    }

    return state;
}
