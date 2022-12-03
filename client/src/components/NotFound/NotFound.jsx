import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

export default function NotFound () {
    return (
        <div className='girdcontainer'>          
            <div>
            <h1 className='error'>404</h1>
            </div>
            <br></br>
            <br></br>
            <div>
            <Link to = '/home'>
                <button className='buttonFound'>Back to Home</button>
            </Link> 
            </div>
            <br></br>
                       
            <div> <h4 className='message'>The page you are looking for could not be found!</h4>
            </div> 
                     
            
             
        </div>        
    )
}