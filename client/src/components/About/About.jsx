import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { Link } from 'react-router-dom';
import './About.css';

export default function About () {
    return (
        <div className='aboutGrid'>
            <div className='navBarAbout'>
                <NavBar />
            </div>            
            <span className='presentation'>Hi reader! my name is Desireth and this my Individual Project for Henry's Web Development Course. <br></br>In this project, I develop a web integrating several technologies that I learn on the course.</span>
            <br></br>
            <br></br>
            <span className='tecnologics'>This website was developed with:</span>
            <br></br>
            <br></br>
            <ol className='aboutTecnologics'>
                <li>Javascript</li>
                <br></br>
                <li>HTML/CSS</li>
                <br></br>
                <li>React & Redux (Front-End)</li>
                <br></br>
                <li>Node Express (Back-End)</li>
                <br></br>
                <li>Sequelize (Database)</li>
                <br></br>
                <li>Jest (Testing)</li>
            </ol>
            <br></br>
            <Link to = '/home'>
                <button>Back to Home</button>
            </Link> 
        </div>
    )
}