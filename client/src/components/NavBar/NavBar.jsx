import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'


export default function NavBar () {
    return (
        <div className = 'navContainer'>           
                   
                         
            <Link to = '/activities' className='navButton'>
                Create Activity
            </Link>       
                                   
        </div>
    )
}
