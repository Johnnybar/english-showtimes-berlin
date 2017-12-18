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
// const mapDispatchToProps = function(state) {
//     return {
//     };
// };

class Area extends React.Component{
    constructor(props){
        super(props)
        this.state={}


    }
    componentDidMount() {
        var areaId = this.props.params.area
            this.props.dispatch(getAllCinemas(areaId));
        // console.log('this is params ',this.props.params);
    }
    render(){

        let cinemas;
        let cinemasList;
        var areaId =this.props.params.area
        cinemas = this.props.cinemas
        if(cinemas){
            console.log('these are cinemas');
            cinemasList = cinemas.map(eachCinema=>
                <div>
                    <div>{eachCinema.name}</div>
                    <a href={'/cinemas/' + `${eachCinema.api_id}`}><img src={eachCinema.imgurl} className='area-cinema-img'/></a>

                </div>
            )
        }

        //AT THIS POINT, MAYBE DISPATCH ACTION WITH THE BELOW AXIOS TO GET GLOBAL STATE???
        return(
            <div>
                <div>Welcome to {areaId}</div>
                <ul>{cinemasList}</ul>

            </div>
        )
    }
}
export default connect(mapStateToProps)(Area)
