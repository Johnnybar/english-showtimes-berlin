import React from 'react';
import axios from './axios';
import Logo from './logo';
import {connect} from 'react-redux';
import {getShowtimesInfo} from './actions'
import {getMoviesInfo, setCinemaInfo} from './actions'

const mapStateToProps = function(state) {
  return {showtimes: state.showtimes, movieArr: state.movieArr, cinemaInfo: state.cinemaInfo}
};

class OneCinema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  handleSubmit() {
    axios.get('/addToSaved/' + this.props.params.cinema)
    document.getElementById('saved-icon').style.animation = "growExplode 0.5s ease-in-out alternate"
    document.getElementById('saved-icon').style.animationIterationCount = "2"
  }

  componentDidMount() {
    axios.get('/getCinemaInfo/' + this.props.params.cinema).then((result) => {
      this.props.dispatch(setCinemaInfo(result))
    }).catch((err) => {
      console.log(err);
    })
    const cinemaId = this.props.params.cinema;
    this.props.dispatch(getShowtimesInfo(cinemaId)).then(() => {
      const showtimes = this.props.showtimes; //This is the showtimes info list
      const movieInfo = this.props.movieArr; //This is the array with synopsis and poster
      for (let i = 0; i < showtimes.length; i++) {
        let movieId = showtimes[i].movie_id;
        this.props.dispatch(getMoviesInfo(movieId, showtimes))
      }
    })

  }

  render() {
    // setTimeout
    const cinemaInfo = this.props.cinemaInfo;
    const showtimes = this.props.showtimes;
    const movieInfo = this.props.movieArr;
    if (!this.props.showtimes && !this.props.cinemaInfo) {
      return (<div className='loader-container'>
        <div className="loader"></div>

      </div>)
    }

    return (<div className='showtimes-container'>
      <div className='cinema-info-container'>
        {cinemaInfo.name}
        <br/> {cinemaInfo.address}
        <br/> {cinemaInfo.area}
        <img src={cinemaInfo.imgurl} className='cinema-page-img'/>
      </div>
      <div className='save-later-ui'>
        Not sure about {cinemaInfo.name}
        tonight?
        <button className='click-btn' onClick={() => this.handleSubmit()}>Save for later</button>
      </div>
      {
        showtimes && showtimes.length > 0 && <div className='moviesContainer'>
            {
              showtimes.map(show => {
                let eachDate;
                let otherDate;
                let hour;
                let dateArr = []
                var string_date = show.start_at
                for (var i = 0; i < string_date.length; i++) {
                  eachDate = new Date(string_date[i])
                  hour = eachDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  otherDate = eachDate.toLocaleDateString();
                  var days = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                  ];
                  var day = days[eachDate.getDay()];
                  var newDate = hour.toString()
                  var secondDate = otherDate.toString()
                  var weekDay = day.toString()
                  dateArr.push(weekDay + ', ' + secondDate + ', ' + newDate + '. ')
                }
                return (<div className='each-movie'>
                  <div className='movie-info-container'>
                    <div className='only-movie-info'>
                      <strong>{show.cinema_movie_title}</strong>
                      <br/>
                      Original Title:
                      <strong>{show.title}</strong>
                      <div>
                        {show.synopsis}</div>
                    </div>
                    <div>
                      <img src={show.thumbnail}/>
                    </div>
                  </div>
                  <div className='word-showtimes'>showtimes:
                    <br/>
                  </div>
                  <div className='times-container'>

                    <div className='each-showtime'>
                      {dateArr.map(each => <p className='each-day'>{each}<br/></p>)}</div>

                  </div>
                  <div className='word-showtimes'>Language: {show.language}</div>
                </div>)
              })
            }
          </div>
      }
    </div>)
  }
}

export default connect(mapStateToProps)(OneCinema)
