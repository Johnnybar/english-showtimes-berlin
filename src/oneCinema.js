import React from 'react';
import axios from './axios';
import Logo from './logo';
import { connect } from 'react-redux';
import {getShowtimesInfo} from './actions'
import {getMoviesInfo} from './actions'
// import Api from './api'
// var modules = require('./modules');

const mapStateToProps = function(state) {
    return {
        showtimes: state.showtimes,
        movieArr: state.movieArr

    }
};

class OneCinema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        const cinemaId= this.props.params.cinema;
        this.props.dispatch(getShowtimesInfo(cinemaId))

    }
    render() {
        console.log('this is movieArr: ', this.props.movieArr);
        console.log('this is props showtimes', this.props.showtimes);
            if (!this.props.showtimes) {
                return (
                    <div>waiting</div>
                )
            }
            const showtimes = this.props.showtimes.showtimes;//THIS IS THE LIST WITH ALL THE SHOWTIMES INFO
            const movieInfo = this.props.movieArr //THIS IS THE ARRAY WITH THE SYNOPSIS AND POSTER
            //NEED TO GET MOVIE NAMES FROM THE API
            for (var i = 0; i < showtimes.length; i++) {
                // console.log('this is now: ',showtimes[i].movie_id);
                var movieId = showtimes[i].movie_id
                // this.props.dispatch(getMoviesInfo(movieId))
                this.props.dispatch(getMoviesInfo(movieId, showtimes))
            }
        //
        return(
            <div>
                Content will be here soon
         {showtimes.length > 1 &&
             <div>
                 {showtimes.map(show =>{
                     // console.log('this is start_at: ', show.start_at);
                     var string_date = (show.start_at)
                     var date = new Date(string_date);


                     // date.getDate() // returns 21 -> day
                     // date.getMonth()

                     ////map movieArr to compare  cinema_movie_title with i
                    return(
                     <div>
                         Movie: {show.cinema_movie_title}
                         <ul>
                             <li>Showtime: {date.toLocaleDateString()}, {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>
                             <li>Language: {show.language}</li>
                             <li>Movie Id:  {show.movie_id}</li>
                             {/* <li><img src={show.poster_image}/></li> */}
                         </ul>
                     </div>
                 )}
                 )}
                </div>}
                </div>
            )


    }
}


// var string_date = '2014-07-21T16:50:34.144Z'
// var date = new Date(string_date);
//
// date.getDate() // returns 21 -> day
// date.getMonth()

export default connect(mapStateToProps)(OneCinema)
