import React from 'react';
import { Link } from 'react-router';

export default function Logo (){
    return(
        <div className='logo'>
            <Link to='/welcome/'><img id='logo' src='/film.svg' /></Link>
    </div>
    )
}
