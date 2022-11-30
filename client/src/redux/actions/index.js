import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT_BY_NAME = "SORT_BY_NAME";




export function getAllCountries() {
    return async function (dispatch) {
      var json = await axios.get("/countries");
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: json.data,
      }); 
      
    };
  }


  export function getCountryByName(name){
    return async function (dispatch){
      try {
        var json=await axios.get(`/countries?name=${name}`)
        return dispatch({
          type: GET_COUNTRY_BY_NAME,
          payload: json.data
        })
      } catch (error) {
        console.log(error)
      }
    }
    }

    export function getCountryDetails(id){
      return async function(dispatch){
        try {
          var json=await axios.get(`/countries/${id}`)  
          return dispatch({
            type: GET_COUNTRY_DETAILS,
            payload: json.data
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  


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


 