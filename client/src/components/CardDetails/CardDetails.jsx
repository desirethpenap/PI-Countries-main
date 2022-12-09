import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
            {
                countryLoad ?
                <p>Loading...</p> :                 
                <>
                    <div className = "flagContainer">
                        <img className="flagimg" src = {myCountry.FlagImg} alt="country flag"/> 
                         <h1 className="countryName">{myCountry.name}</h1>              
                    </div>
                 <div className="dataContainer">
                        <div className = "cardDetailContainer"> 
                                  
                                    <h2>ID: {myCountry.id}</h2>                                    
                                    <h3>Capital: {myCountry.Capital}</h3>                                
                                    <h3>Subregion: {myCountry.Subregion}</h3>                                    
                                    <h3>Area: {myCountry.Area}km²</h3>                                    
                                    <h3>Population: {myCountry.Population}</h3>
                                   
                        </div>
                   
                                                    
                           
                            <div className = 'cardDetailContainer'>
                                  {checkActivities()}
                                   
                                    {myCountry.Activities?.map(e => <div>
                                        <ul>
                                            <li className="idtitle">Name: {e.name}</li>                                          
                                            <li className="idtitle">Difficulty: {e.difficulty}</li>                                           
                                            <li className="idtitle">Duration: {e.duration}</li>                                            
                                            <li className="idtitle">Season: {e.season}</li>
                                                                                       
                                        </ul>
                                    </div>
                                    )}
                                    <div>                                   
                                        <Link to={{pathname: "/activities"}}>
                                        <button className="btoncreate">Create New Activity</button>
                                        </Link>
                                    </div>


                                    
                                </div>

                        <div className = 'buttonDetailsLocation'>
                        <NavLink to = '/home' className = "buttonDetails">Back to Home</NavLink>
                        </div>                                 
                      
                   </div>                  
                </>                
            }            
           
            
        </div>
    )   
}