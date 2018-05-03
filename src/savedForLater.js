import React from 'react';
import Logo from './logo';
import { Link } from 'react-router';
import axios from './axios'
import { connect } from 'react-redux';
import {getCinemasForSaved, deleteSingleCinema} from './actions'


const mapStateToProps = function(state) {
    return {
        cinemasForSaved: state.cinemasForSaved,

    }
};

class SavedForLater extends React.Component{
    constructor(props){
        super(props)
        this.state={}

    }
    handleSubmit(apiId) {
        axios.get('/deleteFromSaved/'+ apiId).then((newCinemaResults)=>{
            this.props.dispatch(deleteSingleCinema(newCinemaResults))
        }).catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount() {
        axios.get('/getSavedCinemas').then((results)=>{
            this.props.dispatch((getCinemasForSaved(results)))

        })

    }
    render(){
        var cinemas= this.props.cinemasForSaved
        if(cinemas){
        var cinemasList = cinemas.map(eachCinema=>
            <div className='saved-container-with-btn'>
            <button className= 'click-btn' onClick={() => this.handleSubmit(eachCinema.api_id) }>Remove</button>
            <div className='container-of-both-saved'>
                <a href={'/cinemas/' + `${eachCinema.api_id}`}>
                    <div className='outer-cinema-container'>
                        <div className='text-inside-cinema'>{eachCinema.name}</div>
                    </div>
                    <div className='each-cinema-container'>
                        <img src={eachCinema.imgurl} className='area-cinema-img'/>
                    </div>
                    </a>
            </div>
            </div>
        )
    }
        return(
            <div className='saved-top-container'>
                <div className='saved-container-with-btn'>
                    <h4 className='paint-white-bg'><i>Removing Sample Cinema not possible in demo mode</i></h4>
                    <div className='container-of-both-saved'>
                        <a href='/sample'>
                        <div className='outer-cinema-container'>
                            <div className='text-inside-cinema'>Sample Cinema</div>
                        </div>
                        <div className='each-cinema-container'>
                            <img src='sample-cinema.jpeg' className='area-cinema-img'/>
                        </div>
                    </a>
                </div>
            </div>
                {cinemasList}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SavedForLater)
