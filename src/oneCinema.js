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
    handleSubmit() {

        console.log('running handleSubmit on login');
        axios.post('/addToSaved/'+ this.props.params.cinema)

    }

    componentDidMount() {
        const cinemaId= this.props.params.cinema;
        this.props.dispatch(getShowtimesInfo(cinemaId)).then(()=>{
            console.log('this is movieArr: ', this.props.movieArr);
            console.log('this is props showtimes', this.props.showtimes);
            const showtimes = this.props.showtimes;//THIS IS THE LIST WITH ALL THE SHOWTIMES INFO
            const movieInfo = this.props.movieArr //THIS IS THE ARRAY WITH THE SYNOPSIS AND POSTER
            //NEED TO GET MOVIE NAMES FROM THE API
            for (var i = 0; i < showtimes.length; i++) {
                // console.log('this is now: ',showtimes[i].movie_id);
                var movieId = showtimes[i].movie_id
                // this.props.dispatch(getMoviesInfo(movieId))
                this.props.dispatch(getMoviesInfo(movieId, showtimes))
            }
        })

    }


    render() {
        // setTimeout
        const showtimes = this.props.showtimes;//THIS IS THE LIST WITH ALL THE SHOWTIMES INFO
        const movieInfo = this.props.movieArr //THIS IS THE ARRAY WITH THE SYNOPSIS AND POSTER
        if (!this.props.showtimes) {
            return (
                <div>waiting</div>
            )
        }

        //
        return(
            <div className='showtimes-container'>
                Not sure if that's where you want to go out tonight?
                <button className= 'default-btn' onClick={() => this.handleSubmit() }>Click here to save for later</button>
         {showtimes.length > 0 &&
             <div className='moviesContainer'>
                 {showtimes.map(show =>{
                     let eachDate;
                     let otherDate;
                     let hour;
                     let dateArr=[]


                     var string_date = show.start_at

                     for (var i = 0; i < string_date.length; i++) {
                         // if (string_date[i] == toRemove) {
                         //     string_date.splice(i, 1);
                         // }
                         eachDate = new Date(string_date[i])
                         hour = eachDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                         otherDate = eachDate.toLocaleDateString();
                         var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                         var day = days[ eachDate.getDay() ];
                         var newDate = hour.toString()
                         var secondDate = otherDate.toString()
                         var weekDay= day.toString()
                         dateArr.push(weekDay + ', ' + secondDate + ', ' + newDate + '. ')
                     }
                     console.log('this is dateArr: ',dateArr);
                    return(
                        <div className='each-movie'>


                         {/* <div>Movie: {show.cinema_movie_title}</div> */}
                        {show.title}
                         <div> {show.synopsis}</div>
                         <div>
                             {/* <img src= {show.poster}/> */}
                             <img src={show.thumbnail}/>
                         </div>
                             {/* <li>Showtime: {show.start_at}</li> */}
                             <div className= 'times-container'>
                             <div className= 'showtimes'>showtimes: <br/>{dateArr}</div>
                             </div>
                             {/* <li>Showtime: {dateArr.toLocaleDateString()}, {dateArr.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li> */}
                             <div>Language: {show.language}</div>

                             {/* <div>{show.movie_id}</div> */}
                             {/* <li><img src={show.thumbnail}/></li> */}
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
