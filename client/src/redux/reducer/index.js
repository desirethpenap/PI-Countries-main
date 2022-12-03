import { GET_ALL_COUNTRIES } from "../actions/index.js";
import { GET_ALL_ACTIVITIES } from "../actions/index.js";
import { GET_COUNTRY_DETAILS } from "../actions/index.js";
import { CREATE_ACTIVITY } from "../actions/index.js";
import { GET_COUNTRY_BY_NAME } from "../actions/index.js";
import { FILTER_BY_ACTIVITY } from "../actions/index.js";
import { FILTER_BY_CONTINENT } from "../actions/index.js";
import { SORT_BY_NAME } from "../actions/index.js";
import { SORT_BY_POPULATION } from "../actions/index.js";




const initialState = {    
  activities: [],
  allCountries: [],
  countries: [],
  countryDetail: [],
 


 // filterByActivity: [],
//filterByContinent: [], 

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:
        case CREATE_ACTIVITY:
          return {
              ...state
          }
        case GET_ALL_ACTIVITIES:
          return {
              ...state,
              activities: action.payload                    
          } 
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload          
            } 
        case GET_COUNTRY_DETAILS:
            return {
              ...state,
              countryDetail: action.payload
            }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload          
            } 
        case FILTER_BY_ACTIVITY:
            const toFilterByActivity = state.countries.filter(e => e.name)
            const activityFilter = toFilterByActivity.filter(c => {
              return c.Activities.some(e => e.name === action.payload)
            });

                console.log('Filtro', activityFilter)
              /*   toFilterByActivity.filter((e) =>
                e.Activities &&
                e.Activities.map((e) => e.name).includes(action.payload));   */              
            return {
                ...state,
                countries: activityFilter
            }
          case FILTER_BY_CONTINENT:  
            const toFilterByContinent = state.allCountries;
            const filteredByContinent = action.payload === 'All' ? 
                toFilterByContinent : 
                toFilterByContinent.filter(c => c.Continent === action.payload)
            return {
                ...state,
                countries: filteredByContinent
            }; 
        case SORT_BY_NAME: 
            let sortedByName = action.payload === 'asc' ?
                state.countries.sort((a, b) => {
                  if(a.name > b.name) {
                    return 1
                  } else if (b.name > a.name) {
                    return -1
                  } else {
                    return 0
                  }}) : 
                state.countries.sort((a, b) => {
                  if(a.name > b.name) {
                    return -1
                  } else if (b.name > a.name) {
                    return 1
                  } else {
                    return 0
                  }}) 
            return {
                ...state,
                allCountries: sortedByName,
                countries: sortedByName
            }
        case SORT_BY_POPULATION:
          let sortedByPopulation = action.payload === "asc" ? 
              state.countries.sort((a, b) => {
                  if (a.Population > b.Population) {
                    return 1;
                  }
                  if (b.Population > a.Population) {
                    return -1;
                  }
                    return 0;
                    
              })
              : state.countries.sort((a, b) => {
                  if (a.Population > b.Population) {
                    return -1;
                  }
                  if (b.Population > a.Population) {
                    return 1;
                  }
                    return 0;
              });
            return {
                ...state,
                allCountries: sortedByPopulation,
                countries: sortedByPopulation,
            };   
      
        default: 
            return {
                ...state
            }      
    }
  };
  
  export default rootReducer;