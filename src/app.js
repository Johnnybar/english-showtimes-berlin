import React from 'react';
import axios from './axios'
import Logo from './logo'
import {browserHistory} from "react-router";





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
            </div>



                <div>This is app</div>
                {/* <div id="webgl-container"></div> */}

                {this.props.children}
                
            <div className= 'footer'>
                <div>This is footer</div>
            </div>
            </div>
        )
    }
}
