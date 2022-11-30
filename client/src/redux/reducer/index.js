import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAILS, FILTER_BY_CONTINENT, SORT_BY_NAME} from "../actions/index.js";



const initialState = {    
    allCountries: [],
    countries: [],
    countryDetail: [],
   

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:        
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

            case FILTER_BY_CONTINENT:  
            const toFilterByContinent = state.allCountries;
            const filteredByContinent = action.payload === 'All' ? 
                toFilterByContinent : 
                toFilterByContinent.filter(c => c.continent === action.payload)
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
            default: 
            return {
                ...state
            }        
       
          }
        }


export default rootReducer