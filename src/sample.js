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


    }
};

class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleSubmit() {

        // console.log('running handleSubmit in oneCinema');

        document.getElementById('saved-icon').style.animation ="growExplode 0.5s ease-in-out alternate"
        document.getElementById('saved-icon').style.animationIterationCount ="2"
        //CHANGE FROM POST TO GET, NEED TO SEE IF WRONG

    }


    componentDidMount() {


    }


    render() {

        // setTimeout


        //
        return(

<div className="main-app-window"><div className="app-container"><div className="showtimes-container">
<div className="cinema-info-container"> Sample Cinema <br/> Random Location 22, 10967 Berlin <br/>
<img src="/sample-cinema.jpeg" className="cinema-page-img"/>
</div><div className="save-later-ui"> Not sure about this cinema tonight?
<button className= 'click-btn' onClick={() => this.handleSubmit() }>Save for later</button>
</div>
<div className="moviesContainer"><div className="each-movie"><div className="movie-info-container">
<div className="only-movie-info"><strong>The Killing of a Sacred Deer (OmU)</strong><br/>
Original Title: <strong>The Killing of a Sacred Deer</strong><div>  A teenager's attempts to bring a brilliant
surgeon into his dysfunctional family take an unexpected turn</div></div><div>
<img src="http://image.tmdb.org/t/p/w154/AqMJ2bu2A4kZYpuCxvwADLpp45D.jpg"/></div></div>
<div className="word-showtimes"> showtimes: <br/></div><div className="times-container"><div className="each-showtime">
<p className="each-day">Monday, 08/01/2018, 17:15. <br/></p><p className="each-day">Monday, 08/01/2018, 20:15. <br/>
</p><p className="each-day">Wednesday, 10/01/2018, 13:45. <br/></p><p className="each-day">Monday, 08/01/2018, 23:00. <br/>
</p><p className="each-day">Tuesday, 09/01/2018, 23:00. <br/></p><p className="each-day">Wednesday, 10/01/2018, 20:15. <br/>
</p><p className="each-day">Tuesday, 09/01/2018, 20:15. <br/></p><p className="each-day">Wednesday, 10/01/2018, 17:15. <br/>
</p><p className="each-day">Tuesday, 09/01/2018, 13:45. <br/></p><p className="each-day">Tuesday, 09/01/2018, 17:15. <br/>
</p><p className="each-day">Wednesday, 10/01/2018, 23:00. <br/></p></div></div><div className="word-showtimes">
Language: en</div></div><div className="each-movie"><div className="movie-info-container">
<div className="only-movie-info"><strong>Queercore: How to Punk a Revolution (OmU)</strong>
<br/>Original Title: <strong>Queercore: How to Punk a Revolution</strong><div>A documentary on Queercore, the
cultural and social movement that began as an offshoot of punk and was distinguished by its discontent with
society's disapproval of the gay, bisexual, lesbian and transgender communities.</div></div>
<div><img src="http://image.tmdb.org/t/p/w154/oFfvdHyJSxNsMEz8oT6QflWxz51.jpg"/></div></div>
<div className="word-showtimes">showtimes: <br/></div><div className="times-container"><div className="each-showtime">
<p className="each-day">Tuesday, 09/01/2018, 18:45. <br/></p></div></div><div className="word-showtimes">Language: en</div>
</div><div className="each-movie"><div className="movie-info-container">
<div className="only-movie-info"><strong>Die Flügel der Menschen - Centaur (OmU)</strong>
<br/>Original Title: <strong>Centaur</strong><div></div></div><div>
<img src="http://imageserver.krankikom.de/film/f348944.jpg"/></div></div>
<div className="word-showtimes">showtimes: <br/></div><div className="times-container"><div className="each-showtime">
<p className="each-day">Tuesday, 09/01/2018, 16:45.  <br/></p><p className="each-day">
Wednesday, 10/01/2018, 16:30.</p>  <br></br></div></div><div className="word-showtimes">Language: en </div>
</div><div className="each-movie"><div className="movie-info-container"><div className="only-movie-info">
<strong>Prachtige Films: Daughters of Darkness - Blut an den Lippen (OmU) in Anwesenheit des Regisseurs</strong><br/>
Original Title: Daughters of Darkness <strong></strong><div></div></div><div>
<img src="/Daughters.jpg"/></div></div><div className="word-showtimes">showtimes:  <br/></div>
<div className="times-container"><div className="each-showtime"><p className="each-day">Friday, 12/01/2018, 19:00.  <br/>
</p><p className="each-day">Wednesday, 10/01/2018, 18:30.  <br/></p></div></div><div className="word-showtimes">Language: en </div></div></div>
</div></div><div className="footer"><div></div></div></div>






            )


    }
}


export default connect(mapStateToProps)(Sample)
