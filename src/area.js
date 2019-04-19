import React from 'react';
import Logo from './logo';
import { Link } from 'react-router';
import axios from 'axios'
import {getAllCinemas} from './actions'
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
    return {
        cinemas: state.cinemas

    }
};

class Area extends React.Component{
    constructor(props){
        super(props)
        this.state={}


    }
    componentDidMount() {
        var areaId = this.props.params.area
            this.props.dispatch(getAllCinemas(areaId));
    }
    render(){

        let cinemas;
        let cinemasList;
        var areaId =this.props.params.area
        cinemas = this.props.cinemas
        if(cinemas){
            cinemasList = cinemas.map(eachCinema=>
            <div className='cinema-outer'>
                <div className='cinema-border'>
                <div className='container-of-both'>
                    <a href={'/cinemas/' + `${eachCinema.api_id}`}>
                        <div className='outer-cinema-container'>
                            <div className='text-inside-cinema'>{eachCinema.name}</div>
                        </div>
                        <div className='each-cinema-container'>
                            <img src={eachCinema.imgurl !=='' ? eachCinema.imgurl : "https://cdn.pixabay.com/photo/2017/07/31/01/11/cinema-2556157_960_720.jpg"} className='area-cinema-img'/>
                        </div>
                        </a>
                </div>
                </div>
            </div>


            )
        }

        return(
            <div className='page-stretcher'>
                <div className='welcome-sign'>Welcome to Cinemas in {areaId}</div>
                <div className='all-cinemas-container'>
                <div className='cinema-outer'>
                    <div className='cinema-border'>
                        <p className='paint-white-bg' style={{textAlign:'center'}}><i>Please choose this sample cinema in demo mode. <br/>It is a saved result of the original showtimes API. <br/> (Use of this API was very high-priced)</i></p>
                    <div className='container-of-both'>
                        <a href='/sample'>
                            <div className='outer-cinema-container'>
                                <div className='text-inside-cinema'>Sample Cinema</div>
                            </div>
                            <div className='each-cinema-container'>
                                <img src='/sample-cinema.jpeg' className='area-cinema-img'/>
                            </div>
                            </a>
                    </div>
                    </div>
                </div>
                </div>

                <div className='all-cinemas-container'>{cinemasList}</div>

            </div>
        )
    }
}
export default connect(mapStateToProps)(Area)
