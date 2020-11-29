import {initialCenterService} from '../services/InitialCenterService'

const initialState = {
    places: [],
    filterBy: null,
    selectedPlace:null,
    initialCenter:initialCenterService.loadInitialCenter() ||{
        lat: 40.854885,
        lng: -88.081807
      },
    center:null,
}

export function placeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLACES':
            return {
                ...state,
                places: action.places
            }
        case 'SET_INITIAL_CENTER':
            return {
                ...state,
                initialCenter: action.position
            }
        case 'SET_CENTER':
            return {
                ...state,
                center: action.position,
            }
            case 'SELECT_PLACE':
                return {
                    ...state,
                    selectedPlace: action.selectedPlace
                }
            case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.filterBy
            }
        case 'ADD_PLACE':
            return {
                ...state,
                places: [...state.places, action.place]
            }
        case 'UPDATE_PLACE':
            return {
                ...state,
                places: state.places.map(place => {
                    if (place._id === action.place._id) return action.place;
                    return place;
                })
            }
        case 'REMOVE_PLACE':
            return {
                ...state,
                places: state.places.filter(place => place._id !== action.placeId)
            }
        default:
            return state;
    }
}