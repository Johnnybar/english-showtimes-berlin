import React from 'react';
import axios from './axios'
import Logo from './logo'
// import { Link } from 'react-router';
import { Link } from 'react-router-dom'




export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}



    }


componentDidMount() {


}
    render() {

    return (

        <div>
            <div>
            <form className='contact-form-container' target="_blank"  action="mailto:johnnybareket@gmail.com" method="post" enctype="text/plain" >
            <br/><div className='bg-white'>Are we missing your favorite cinema? Did we gain weight? Send us an email and we'll sort it out!</div><br/>
            Full Name: <input type="text" name="FullName"></input>
                Email:<input type="text" name="Email"></input>
                    <textarea id= 'text-area-contact' placeholder='Let us know if you have any suggestions'></textarea>
                    <input className='click-btn' type="submit" name="submit" value="Submit"></input>
            </form>
            </div>

        </div>

        )
    }
}
