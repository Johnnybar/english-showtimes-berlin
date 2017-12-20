import React from 'react';
import Logo from './logo';
import { Link } from 'react-router';
import axios from 'axios'
import { connect } from 'react-redux';
import {getCinemasForSaved} from './actions'

// import Api from './api'
// var modules = require('./modules');

const mapStateToProps = function(state) {
    // console.log('this is state.cinemasForSaved: ', state.cinemasForSaved);
    return {
        cinemasForSaved: state.cinemasForSaved,

    }
};




class SavedForLater extends React.Component{
    constructor(props){
        super(props)
        this.state={}

    }
    componentDidMount() {
        axios.get('/getSavedCinemas').then((results)=>{
            this.props.dispatch((getCinemasForSaved(results)))

        })

    }
    render(){
        var cinemas= this.props.cinemasForSaved
        // console.log('these are cinemas: ', cinemas);
        if(cinemas){
        var cinemasList = cinemas.map(eachCinema=>
            <div className='container-of-both'>
                <a href={'/cinemas/' + `${eachCinema.api_id}`}>
                    <div className='outer-cinema-container'>
                        <div>{eachCinema.name}</div>
                    </div>
                    <div className='each-cinema-container'>
                        <img src={eachCinema.imgurl} className='area-cinema-img'/>
                    </div>
                    </a>
            </div>

        )
    }
        return(
            <div>
                <div>This is Saved For Later</div>
            <div className='all-cinemas-container'>
                {cinemasList}
            </div>



                {/* {this.props.children} */}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SavedForLater)
