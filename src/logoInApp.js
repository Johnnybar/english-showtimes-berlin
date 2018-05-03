import React from 'react';
import { Link } from 'react-router';

export default function LogoInApp (){
    return(
        <div className='logo'>
            <Link className='paint-white-bg' to='/welcome/'><img id='logo' src='/logo.png' /><br/></Link>
    </div>
    )
}
