import React from 'react';
// import Logo from './logo';
import { Link } from 'react-router';






export default class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state={}

    }

    componentDidMount() {
        let iframeDesktop = document.getElementById('youtube');
        let dataSrc= "https://vignette.wikia.nocookie.net/joke-battles/images/5/5a/Black.jpg/revision/latest?cb=20161223050425"
        if(window.matchMedia("(min-width: 480px)").matches) {
            iframeDesktop.attr('src', dataSrc)
    }
    render(){
        return(
            <div>

                <iframe id='youtube' src="https://www.youtube.com/embed/6AZdyfCaLyg?autoplay=1&controls=0&loop=1&playlist=8HSr8BjcufM&amp;showinfo=0" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                {/* <Logo /> */}

                <div className='hero-welcome-page'><h2>Choose your favorite Berlin kiez to get started</h2></div>
                {this.props.children}
            </div>
        )
    }
}
