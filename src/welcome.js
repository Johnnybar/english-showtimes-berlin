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

                <iframe src="https://www.youtube.com/embed/WoZQ0ivvW7E?autoplay=1&controls=0&loop=1&playlist=8HSr8BjcufM&amp;showinfo=0" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                <Logo />
                <div>This is Welcome</div>


                {this.props.children}
            </div>
        )
    }
}
