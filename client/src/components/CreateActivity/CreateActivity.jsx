import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivity, getAllActivities } from "../../redux/actions/index";
import './CreateActivity.css';

export default function CreateActivity () {
    const dispatch = useDispatch();
    const allcountries = useSelector(state => state.allcountries);
    const history = useHistory();
    
    
    /*TRAIGO UN ESTADO LOCAL DE MIS ACTIVITIES PARA PODER MAPEAR**********************/
    /*SUS NOMBRES Y PODER USARLOS PARA LA VALIDACION DE NOMBRES REPETIDOS*************/
    const activities = useSelector(state => state.activities);
    const tours_names = activities.map(activitie => activitie.name);
    /*************************************************************** */

    
    const [state,setState] = React.useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
    });

    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    
    /*FUNCIÓN VALIDADORA DEL INPUT DEL NOMBRE DE LA ACTIVIDAD************************/
    const validate=(state)=>{
        let errors={};
        let name_repeated = tours_names.filter(name => name === state.name);

        if(!state.name) errors.name="Activity name is required";
        else if(name_repeated.length) errors.name=`The activity >>${state.name}<< was already created`;       
        errors.name="Activity name is invalid: simbols, spaces or numbers are not allowed";
        if(!state.difficulty) errors.difficulty = "*Please select a difficulty*";        
        if(!state.season) errors.season = "*Please select a season*";
        if(state.relatedCountries.length === 0) errors.relatedCountries = "*Please select a country*";
        if(!state.duration) errors.duration = "*Duration time required*";
        if(state.name.length < 3 || state.name.length > 15) errors.name = "*Invalid activity name*";      
               

        if (Object.entries(errors).length === 0) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }

        return errors;
    }
    
    const handlerChangeName = (e) => {
        let value = e.target.value;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        const property = e.target.name;
        setState({...state,[property]: value});
        setErrors(validate({...state,[property]: value}));
    }

    const handlerChange = (e) => {
        const value = e.target.value;
        const property = e.target.name;
        setState({...state,[property]: value});
    }

    /*GUARDO EN MI ESTADO COUNTRIES LOS PAISES QUE VOY SELECCIONANDO EN MI SELECT****/
    /*Y UTILIZO EL NEW SET PARA ELIMINAR DUPLICADOS**********************************/
    const handlerSelectCountry = (e) => {
        setState({
            ...state,
            countries: [...new Set([...state.countries, e.target.value])]
        })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        let validateName = activities.find(a => a.name === (state.name))
        if(validateName !== undefined) {
            alert("Activity by that name already exists!")
        } else {
            dispatch(createActivity(state))
            alert("Activity created!!")
            setState({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                relatedCountries:[]
            })
            history.push('/home')
                      
        }        
    }
 
    const handlerDelete = (event)=>{
        setState({
            ...state,
            countries: state.countries.filter(country => 
                country !== event.target.value)
        })
    }

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities())
        }, [dispatch]);
    
    return (
        <div className= "createActivyGrid">
            <div className="navBarCreate">
                <NavBar/>
            </div>
            <div className="contentCreate">
                <h1>Create your Activity! </h1>
                <form onSubmit={handlerSubmit}>
                <div>
                    <label>Name: </label>
                        <input  type="text" 
                                name="name"
                                onChange={handlerChangeName} 
                                placeholder={"Here goes the activity's name"} 
                                value={state.name}                               
                                required/>
                                {/*Renderizo un parrafo que indica el tipo de error del input del name*/}
                                {errors.name &&<p>{errors.name}</p>}
                
                    <label>Difficulty: </label>
                        <div >
                        <select defaultValue = {'default'} name = "difficulty" onChange = {e => handlerChange(e)}>
                            <option value ='default' disabled>Difficulty</option>
                            <option value ="1">1</option>
                            <option value ="2">2</option>
                            <option value ="3">3</option>
                            <option value ="4">4</option>
                            <option value ="5">5</option>
                        </select>
                        </div>
                        <div>
                        {errors.difficulty && (
                            <p className = "p">{errors.difficulty}</p>
                        )}
                        </div>
                        <br></br>

                        <label >Duration: </label>
                        <div>
                            <select type = "text"
                        value = {state.duration}
                        name = "duration"
                        onChange = {handlerChange}
                        >
                        {errors.duration && (
                            <p className = "p">{errors.duration}</p>
                        )}
                            </select>
                        </div>
                    <label>Season: </label>
                        <div>
                        <select defaultValue = {'default'} name = "season" onChange = {e => handlerChange(e)}>
                            <option value='default' disabled>Season</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumn</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>
                    <div>
                    {errors.season && (
                        <p className = "p">{errors.season}</p>
                    )}
                        </div>
                </div>

                <div >
                <label >Countries: </label>
                    <div>
                        <select className ="countries" onChange={handlerSelectCountry} >
                            <option hidden selected>Select one or more countries</option>
                            {allcountries.map(country => 
                            <option key={country.id} value={country.name}>{country.name}</option>)}
                        </select>
                        {/*Renderizo un parrafo que indica el error si no se selecciona ningún country*/}
                        {!state.countries.length &&<p>Select at least one Country</p>}
                    </div>
                        {/*Aquí renderizo las countries seleccionadas en el "select", con un botón para poder
                        eliminarlas si se agregan por error*/}
                    <div>
                        {state.countries.map(country =>
                        <div key={country}>{country}
                            <button
                                    value={country} 
                                    onClick={handlerDelete}>X</button>
                        </div>
                        )}
                    </div>
                
                    <button
                        disabled={!state.name || errors.name || !state.difficulty || !state.duration || !state.season || !state.countries.length || !buttonEnabled }
                        type ='submit'>Create</button>
                    {(!state.name || errors.name || !state.difficulty || !state.duration || !state.season || !state.countries.length) && 
                    <p>Button disabled, one or more fields are empty</p>}
                </div>
            </form>    
            <br></br>
                <NavLink to = '/home'>
                    <button>Back to Home</button>
                </NavLink>  
                
            </div>
            
        </div>
    ) 
};


