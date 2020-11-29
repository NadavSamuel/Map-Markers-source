import { mainService } from '../services/mainService';
import {initialCenterService} from '../services/InitialCenterService'
// Dispatchers
const _removePlace = (placeId) => ({ type: 'REMOVE_PLACE', placeId });
const _setPlaces = (places) => ({ type: 'SET_PLACES', places });
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _selectPlace = (selectedPlace) => ({ type: 'SELECT_PLACE', selectedPlace });
const _setInitialCenter = (position) => ({ type: 'SET_INITIAL_CENTER', initialCenter:position });
const _setCenter = (position) => ({ type: 'SET_CENTER', position });

// THUNK
export function selectPlace(placeId) {
    return async (dispatch) => {
        const selectedPlace = await mainService.getById(placeId);
        dispatch(_selectPlace(selectedPlace));
    }
}
export function setInitialCenter(position) {
    initialCenterService.saveInitialCenter(position)
    return (dispatch) => dispatch(_setInitialCenter(position))
}
export function setCenter(position) {
    return (dispatch) => dispatch(_setCenter(position))
}
// export function loadPlace(placeId) {
//     return async (dispatch) => {
//         const placeToLoad = await mainService.getById(placeId);
//         dispatch(_loadPlace(placeToLoad));
//     }
// }
export function loadPlaces(filterBy) {
    return async (dispatch) => {
        const places = await mainService.query(filterBy);
        dispatch(_setPlaces(places));
    }
}
export function reOrganizePlaces(places) {
    return async (dispatch) => {
        dispatch(_setPlaces(places));
    }
}
export function removePlace(placeId) {
    return async (dispatch) => {
        mainService.remove(placeId)
        dispatch(_removePlace(placeId))
    }
}
export function setFilter(filterBy) {
    return (dispatch) => dispatch(_setFilter(filterBy))
}

export  function savePlace(place) {
    return async (dispatch,getState) => {
        const type = place._id ? 'UPDATE_PLACE' : 'ADD_PLACE';
        const savedPlace = await mainService.save(place)
        dispatch({ type, place: savedPlace })  
    }
}
export  function reOrgenizePlaces(movedPlaceIdx,destinationIdx) {
    return async (dispatch) => {
        const reOrganisedPlaces = await mainService.saveReorgenizedPlaces(movedPlaceIdx,destinationIdx)
        dispatch(_setPlaces(reOrganisedPlaces));
    }
}


