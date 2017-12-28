import React from 'react';
import axios from './axios';
import Logo from './logo';
import { connect } from 'react-redux';
import {getShowtimesInfo} from './actions'
import {getMoviesInfo, setCinemaInfo} from './actions'
// import Api from './api'
// var modules = require('./modules');

const mapStateToProps = function(state) {
    return {
        showtimes: state.showtimes,
        movieArr: state.movieArr,
        cinemaInfo: state.cinemaInfo

    }
};

class OneCinema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleSubmit() {

        console.log('running handleSubmit in oneCinema');
        axios.get('/addToSaved/'+ this.props.params.cinema)
        document.getElementById('saved-icon').style.animation ="growExplode 0.5s ease-in-out alternate"
        document.getElementById('saved-icon').style.animationIterationCount ="2"
        //CHANGE FROM POST TO GET, NEED TO SEE IF WRONG

    }

    componentDidMount() {
        axios.get('/getCinemaInfo/' +this.props.params.cinema).then((result)=>{
            this.props.dispatch(setCinemaInfo(result))
        })
        const cinemaId= this.props.params.cinema;
        this.props.dispatch(getShowtimesInfo(cinemaId)).then(()=>{
            console.log('this is movieArr: ', this.props.movieArr);
            console.log('this is props showtimes', this.props.showtimes);
            const showtimes = this.props.showtimes;//THIS IS THE LIST WITH ALL THE SHOWTIMES INFO
            const movieInfo = this.props.movieArr //THIS IS THE ARRAY WITH THE SYNOPSIS AND POSTER
            //NEED TO GET MOVIE NAMES FROM THE API
            for (let i = 0; i < showtimes.length ; i++) {
                // console.log('this is now: ',showtimes[i].movie_id);
                let movieId = showtimes[i].movie_id
                this.props.dispatch(getMoviesInfo(movieId, showtimes))
            }
        })

    }


    render() {
        // setTimeout
        const cinemaInfo= this.props.cinemaInfo
        const showtimes = this.props.showtimes;//THIS IS THE LIST WITH ALL THE SHOWTIMES INFO
        const movieInfo = this.props.movieArr //THIS IS THE ARRAY WITH THE SYNOPSIS AND POSTER
        if (!this.props.showtimes) {
            return (
                <div className='loader-container'>
                <div className="loader"></div>
                </div>

            )
        }

        //
        return(
            <div className='showtimes-container'>
                <div className='cinema-info-container'>
                    {cinemaInfo.name}
                    <br/>
                    {cinemaInfo.address}
                    <br/>
                    {cinemaInfo.area}
                    <img src={cinemaInfo.imgurl} className='cinema-page-img'/>
                </div>
                <div className= 'save-later-ui'>
                Not sure if you feel like {cinemaInfo.name} tonight?
                <button className= 'click-btn' onClick={() => this.handleSubmit() }>Click to save this option for later</button>
                </div>
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
                     // console.log('this is dateArr: ',dateArr);
                    return(
                        <div className='each-movie'>
                         {/* <div>Movie: {show.cinema_movie_title}</div> */}
                         <div className= 'movie-info-container'>
                             <div className='only-movie-info'>
                        <strong>{show.cinema_movie_title}</strong>
                        <br/>
                        Original Title: <strong>{show.title}</strong>
                         <div> {show.synopsis}</div>
                     </div>
                         <div>
                             {/* <img src= {show.poster}/> */}
                             <img src={show.thumbnail}/>
                         </div>
                        </div>
                             {/* <li>Showtime: {show.start_at}</li> */}
                             <div className='word-showtimes'>showtimes: <br/>
                             </div>
                             <div className= 'times-container'>

                             <div className='each-showtime'>
                             {dateArr.map(each=>
                                 <p className= 'each-day'>{each}<br/></p>
                             )}</div>

                             </div>
                             {/* <li>Showtime: {dateArr.toLocaleDateString()}, {dateArr.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li> */}
                             <div className='word-showtimes'>Language: {show.language}</div>
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


export default connect(mapStateToProps)(OneCinema)
