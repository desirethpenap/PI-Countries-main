import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVTY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";
export const LOADING = "LOADING";
export const PAGINATION = "PAGINATION";


export function getAllCountries() {
    return async function (dispatch) {
      var json = await axios.get("/countries");
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: json.data,
      }); 
      
    };
  }

  export function getAllActivities(){
    return async function (dispatch){
        var json=await axios.get(`/activities`)
        return dispatch({
          type: "GET_ALL_ACTIVITIES",
          payload: json.data
        });
    }
  } 

  export function getCountryDetails  (id) {
    return async function(dispatch){
      try {
        var json=await axios.get(`/countries/${id}`)  
        return dispatch({
          type: GET_COUNTRY_DETAILS,
          payload: json.data
        })
      } catch(error){
        return dispatch({type:GET_COUNTRY_DETAILS, payload: {}});
    }
    }
  }

    
export const getCountryByName = (name) =>{
  return async function(dispatch){
      try{
          let response = await axios.get(`/countries?name=${name}`);
          return dispatch({type:GET_COUNTRY_BY_NAME, payload: response.data});
      }catch(error){
          return dispatch({type:GET_COUNTRY_BY_NAME, payload: error.message});
      }
  };
};

  

    export const createActivity = (payload) => {
      return async function (dispatch) {
        try {
          var response = await axios.post('/activities', payload);
          return response
        } catch (e) {
          alert(e)
        }        
      }
  };
  

 
  
export const filterByActivity = (payload) => {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload
  }
};



  export const filterByContinent = (payload) => {
    return {
      type:"FILTER_BY_CONTINENT",
      payload
    }
};
  
export const sortByName = (payload) => {
    return {
      type:'SORT_BY_NAME',
      payload
    }
};


export const sortByPopulation = (payload) => {
  return {
    type: "SORT_BY_POPULATION",
    payload
  }
};

export const loading = () => {
  return {type: LOADING};
};

export const SetPagitionGlobal = (payload) => {
  return {type: PAGINATION, payload}
};

 