import { GET_ALL_COUNTRIES } from "../actions/index.js";
import { GET_ALL_ACTIVITIES } from "../actions/index.js";
import { GET_COUNTRY_DETAILS } from "../actions/index.js";
import { CREATE_ACTIVITY } from "../actions/index.js";
import { GET_COUNTRY_BY_NAME } from "../actions/index.js";
import { FILTER_BY_ACTIVITY } from "../actions/index.js";
import { FILTER_BY_CONTINENT } from "../actions/index.js";
import { SORT_BY_NAME } from "../actions/index.js";
import { SORT_BY_POPULATION } from "../actions/index.js";
import { LOADING } from "../actions/index.js";
import { PAGINATION } from "../actions/index.js";



const initialState = {    
  activities: [],
  allCountries: [],
  countries: [],
  countryDetail: [],
  loading: true,
  actualPage: 1,
 // filterByActivity: [],
//filterByContinent: [], 

}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case PAGINATION:
       return{
        ...state,
        actualpage: action.payload

      }
    case LOADING:
       return{
          ...state,
          loading:true,
        }
    case GET_ALL_COUNTRIES:
       return {
              ...state,
              loading:false,
              allCountries: action.payload,
              countries: action.payload          
          } 
    case GET_ALL_ACTIVITIES:
       return {
                ...state,
                activities: action.payload                    
            } 

    case GET_COUNTRY_BY_NAME:
        return {
              ...state,
              countries: action.payload          
          }   
      
    case GET_COUNTRY_DETAILS:
          return {
            ...state,
            loading:false,
            countryDetail: action.payload
          }
    case CREATE_ACTIVITY:
          return {
            ...state,
              activities: [...state.activities, action.payload]
            }
    case FILTER_BY_CONTINENT:  
          const allcountries = state.allcountries;
          const filterstatus = action.payload === "All"? allcountries :
          allcountries.filter(country => country.continent === action.payload)
          return{
              ...state,
              countries: filterstatus
          };        
   
    case FILTER_BY_ACTIVITY:
      const all_countries2 = state.allcountries;
      const filtercountries = action.payload === "All"? 
      all_countries2.filter(country => country.tours.length > 0): 
      all_countries2.filter(country => country.tours.find(tour => 
          tour.name === action.payload));
      return {
          ...state,
          countries: filtercountries
      };
   
    case SORT_BY_NAME: 
    let sortedArraux1 = [];
    let sortedArraux2 = [];  
    if(action.payload === "up"){
        sortedArraux1 = state.countries.sort((country1,country2)=>{
            if(country1.name > country2.name) return 1;
            if(country2.name > country1.name) return -1;
            return 0});
        sortedArraux2 = state.allcountries.sort((country1,country2)=>{
            if(country1.name > country2.name) return 1;
            if(country2.name > country1.name) return -1;
            return 0});
    }else{
        sortedArraux1 = state.countries.sort((country1,country2)=>{
            if(country1.name > country2.name) return -1;
            if(country2.name > country1.name) return 1;
            return 0});
        sortedArraux2 = state.allcountries.sort((country1,country2)=>{
            if(country1.name > country2.name) return -1;
            if(country2.name > country1.name) return 1;
            return 0});
    }
    return {
        ...state,
        countries: sortedArraux1,
        allcountries: sortedArraux2
    };
    case SORT_BY_POPULATION:
      let sortedBArraux1 = [];
      let sortedBArraux2 = [];
      if(action.payload === "less"){
          sortedBArraux1 = state.countries.sort((country1,country2)=>{
              if(country1.population > country2.population) return 1;
              if(country2.population > country1.population) return -1;
              return 0});
          sortedBArraux2 = state.allcountries.sort((country1,country2)=>{
              if(country1.population > country2.population) return 1;
              if(country2.population > country1.population) return -1;
              return 0});
      }else{
          sortedBArraux1 = state.countries.sort((country1,country2)=>{
              if(country1.population > country2.population) return -1;
              if(country2.population > country1.population) return 1;
              return 0});
          sortedBArraux2 = state.allcountries.sort((country1,country2)=>{
              if(country1.population > country2.population) return -1;
              if(country2.population > country1.population) return 1;
              return 0});
      }
      return {
          ...state,
          countries: sortedBArraux1,
          allcountries: sortedBArraux2
      }

      default: 
          return {
              ...state
          }      
  }
};

export default rootReducer;