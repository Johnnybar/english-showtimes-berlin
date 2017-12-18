import React from 'react';
import Logo from './logo';
import { Link } from 'react-router';




export default class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state={}

    }
    render(){
        return(
            <div>
                <Logo />
                <div>This is Welcome</div>


                {this.props.children}

            </div>
        )
    }
}
