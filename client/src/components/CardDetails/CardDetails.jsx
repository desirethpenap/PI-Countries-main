import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './CardDetails.css';


export default function CardDetails (props) {
    const dispatch = useDispatch();

    const history = useHistory();

    const myCountry = useSelector((state) => state.countryDetail);

    const [countryLoad, setCountryLoad] = useState(true);    

    useEffect(() => {
        const chargeCountry = async() => {   
            await dispatch(getCountryDetails(props.R)) 
            setCountryLoad(false)  
            console.log (props.R)
            };
        chargeCountry() 
    }, [dispatch, props.R]);

    function checkActivities () {
        try {
            if (myCountry.Activities.length) {
                return (
                    <h3><b>Activities: </b></h3>
                )
            } else {
                return ""
            }
        } catch (e) {
         
        }
    }

    return (
        <div className = 'cardDetailsGrid'>
            <div className = 'navBarDetails'>
                <NavBar />
            </div>
            <div className="contentDetails">
            {
                countryLoad ?
                <p>Loading...</p> :                 
                <div>
                    <div className = "flagDetails">
                        <img src = {myCountry.FlagImg} alt="country flag"/>
                    </div>
                    <br></br>
                    <div className = 'countryDetailsBody'>
                        <div className = "countryDetails">                   
                            <h1>Name: {myCountry.name}</h1>
                            <br></br>
                            <h2>Id: {myCountry.id}</h2>
                            <br></br>
                            <h3>Capital: {myCountry.Capital}</h3>
                            <br></br>
                            <h3>Subregion: {myCountry.Subregion}</h3>
                            <br></br>
                            <h3>Area: {myCountry.Area}</h3>
                            <br></br>
                            <h3>Population: {myCountry.Population}</h3>
                            <br></br>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className = 'coutryActivities'>
                            {checkActivities()}
                            <br></br>
                            {myCountry.Activities?.map(e => <div>
                                <ul>
                                    <li>Name: {e.name}</li>
                                    <br></br>
                                    <li>Difficulty: {e.difficulty}</li>
                                    <br></br>
                                    <li>Duration: {e.duration}</li>
                                    <br></br>
                                    <li>Season: {e.season}</li>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </ul>
                            </div>
                            )}
                        </div> 
                    </div>                  
                </div>                
            }            
            </div>
            <div className = 'buttonDetailsLocation'>
            <NavLink to = '/home' className = "buttonDetails">Back to Home</NavLink>
            </div>            
        </div>
    )   
}