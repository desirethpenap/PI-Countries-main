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
      
            <div className="contentDetails">
            {
                countryLoad ?
                <p>Loading...</p> :                 
                <div>
                    <div className = "flagContainer">
                        <img className="flagimg" src = {myCountry.FlagImg} alt="country flag"/> 
                         <h1 className="countryName">{myCountry.name}</h1>               
                                    <br></br>

                    </div>
                    <div className="dataContainer">
                        <div className = "rowContainer"> 
                                  
                                    <h2 className="idtitle">ID: {myCountry.id}</h2>
                                    
                                    <h3 className="idtitle">Capital: {myCountry.Capital}</h3>
                                
                                    <h3 className="idtitle">Subregion: {myCountry.Subregion}</h3>
                                    
                                    <h3 className="idtitle">Area: {myCountry.Area}</h3>
                                    
                                    <h3 className="idtitle">Population: {myCountry.Population}</h3>
                                    <br></br>
                        </div>
                   
                               <br></br>
                               <br></br>   
                               <br></br>  
                               <br></br>                        
                           
                            <div className = 'ActivityContainer'>
                                <h3>Activities</h3>

                                    {checkActivities()}
                                    <br></br>
                                    {myCountry.Activities?.map(e => <div>
                                        <ul>
                                            <li className="idtitle">Name: {e.name}</li>
                                            <br></br>
                                            <li className="idtitle">Difficulty: {e.difficulty}</li>
                                            <br></br>
                                            <li className="idtitle">Duration: {e.duration}</li>
                                            <br></br>
                                            <li className="idtitle">Season: {e.season}</li>
                                            <br></br>                                            
                                        </ul>
                                    </div>
                                    )}
                                    <div>                                   
                                        <Link to={{pathname: "/activities"}}>
                                        <button>Create New Activity</button>
                                        </Link>
                                    </div>


                                    
                                </div>

                        <div className = 'buttonDetailsLocation'>
                        <NavLink to = '/home' className = "buttonDetails">Back to Home</NavLink>
                        </div>                                 
                      
                   </div>                  
                </div>                
            }            
            </div>
            
        </div>
    )   
}