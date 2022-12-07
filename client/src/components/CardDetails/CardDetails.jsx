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
        }catch (e) {
            alert('Country not Found');
            history.push('/404')         
        }
    }

    return (
        <div className = 'cardDetails'>
            <div className = 'navBarDetails'>
                <NavBar />
            </div>
            <div className="contentDetails">
            {
                countryLoad ?
                <p>Loading...</p> :                 
                <div>
                    <div className = "flagDetails">
                        <img className="flagimg" src = {myCountry.FlagImg} alt="country flag"/>
                        <h1 className="countryName">{myCountry.name}</h1>
                        <div className = "countryDetails">                  
                                    
                                    <br></br>
                                    <h2 className="datas">ID: {myCountry.id}</h2>
                                    
                                    <h3 className="datas">Capital: {myCountry.Capital}</h3>
                                
                                    <h3 className="datas">Subregion: {myCountry.Subregion}</h3>
                                    
                                    <h3 className="datas">Area: {myCountry.Area}</h3>
                                    
                                    <h3 className="people">Population: {myCountry.Population}</h3>
                                    <br></br>
                        </div>
                    </div>
                    <br></br>                 
                           
                            <div className = 'countryActivities'>
                                    {checkActivities()}
                                    <br></br>
                                    {myCountry.Activities?.map(e => <div>
                                        <ul>
                                            <li className="datasAct">Name: {e.name}</li>
                                            <br></br>
                                            <li className="datasAct">Difficulty: {e.difficulty}</li>
                                            <br></br>
                                            <li className="datasAct">Duration: {e.duration}</li>
                                            <br></br>
                                            <li className="datasAct">Season: {e.season}</li>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                        </ul>
                                    </div>
                                    )}
                                </div>
                      
                        <br></br>
                        <br></br>
                        <div className = 'buttonDetailsLocation'>
                        <NavLink to = '/home' className = "buttonDetails">Back to Home</NavLink>
                        </div>                                 
                      
                                     
                </div>                
            }            
            </div>
            
        </div>
    )   
}