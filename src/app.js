import React from 'react';
import axios from './axios'
import Logo from './logo'
// import {browserHistory} from "react-router";
// var BrowserHistory = require('react-router/lib/BrowserHistory').default;
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

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
                <Link to='/savedForLater'>Saved For Later</Link>
                <div><a onClick={browserHistory.goBack}>Go Back</a></div>
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
