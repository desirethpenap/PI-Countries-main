import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar () {
    return (
        <div className = 'navContainer'>
            
            <Link to = '/home' className='navButton'>
                Home
            </Link>      
                       
        </div>
    )
}
