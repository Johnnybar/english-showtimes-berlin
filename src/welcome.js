import React from 'react';
// import Logo from './logo';
import { Link } from 'react-router';






export default class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state={}

    }

    componentDidMount() {
        // let iframeDesktop = document.getElementById('youtube');
        // let dataSrc= "https://vignette.wikia.nocookie.net/joke-battles/images/5/5a/Black.jpg/revision/latest?cb=20161223050425"
        // if(window.matchMedia("(min-width: 480px)").matches) {
        //     iframeDesktop.attr('src', dataSrc)
    }
    render(){
        return(
            <div>

                <iframe id='youtube' src="https://c1.staticflickr.com/2/1451/25750387696_5b124b9797_b.jpg"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                {/* <Logo /> */}

                <div className='hero-welcome-page'><h2>Choose your favorite Berlin kiez to get started</h2></div>
                {this.props.children}
            </div>
        )
    }
}
