import React from 'react';
import axios from './axios'
import Logo from './logo'
import {browserHistory} from "react-router";
import { Link } from 'react-router';





export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }


    componentDidMount() {

    }
    render() {

        return (
            <div className='main-container'>


                <div className= 'header'>
                <Logo />
                {/* <a href='/savedForLater'>Saved For Later</a> */}
                <Link to='/savedForLater'>Saved For Later</Link>
            </div>



                <div className='main-app-window'>This is app</div>
                {/* <div id="webgl-container"></div> */}

                {this.props.children}

            <div className= 'footer'>
                <div>This is footer</div>
            </div>
            </div>
        )
    }
}
