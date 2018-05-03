import React from 'react';
import { Link } from 'react-router';

export default class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount() {}
    render(){
        return(
            <div>
                <div className='iframe-container'>
                    <div className='iframe-bg'></div>
                </div>
                <div className='hero-welcome-page'><h2>Choose your favorite Berlin kiez to get started</h2></div>
                {this.props.children}
            </div>
        )
    }
}
