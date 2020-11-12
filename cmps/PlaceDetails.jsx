import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useDispatch, useSelector } from 'react-redux'
import { setInitialCenter,removePlace,loadPlaces} from '../actions/placeActions.js';
import { setNotification} from '../actions/notificationActions'

export function _PlaceDetails(props) {
    const dispatch = useDispatch()
    const {  place, toggleIsEdit,onCloseModal } = props
    const isExsictingNotification = useSelector(state => state.notificationReducer.txt);

     function onSetInitialCenter() {
        try {
             dispatch(setInitialCenter(place.position))

             dispatch(setNotification('success', `successfully saved "${place.title || 'Unknown place '}" as initial center`,!!isExsictingNotification))
        }
        catch {
             dispatch(setNotification('err', `OOPS! something went wrong, could'nt save current place as initial center`))
        }
    }
     function onDeletePlace() {
        const currPlaceTitle = place.title || 'Unknown place'
        try {
             onCloseModal()
             dispatch(removePlace(place._id))
             dispatch(loadPlaces())
             dispatch(setNotification('success', `Successfully deleted "${currPlaceTitle}"` ,!!isExsictingNotification))
            }
        catch {
            dispatch(setNotification('err', `OOPS! something went wrong, could'nt delete ${currPlaceTitle}`))
        }
    }
    return (
        <React.Fragment>
            <div className="place-details-container">
                <h1>{place.title || 'No title yet'}</h1>
                <div className="map-wraper-modal">
                    <Map
                        google={props.google} zoom={7}
                        initialCenter={place.position}>
                        <Marker
                            position={place.position}
                            name={'Current location'} />
                    </Map>
                </div>
                <div className="place-details">
                    <h3><span>Latitude: </span>{place.position.lat}</h3>
                    <h3><span>Langtitude: </span>{place.position.lng}</h3>
                    <h3>Description:</h3>
                    <p>{place.description || 'No description yet'}</p>
                </div>
                <div className="action-btns flex space-between">
                    <button onClick={toggleIsEdit}>Edit </button>
                    <button onClick={onSetInitialCenter}>Set as initial center </button>
                    <button onClick={onDeletePlace}>Delete </button>
                </div>
            </div>
        </React.Fragment>
    );
}
export const PlaceDetails = (GoogleApiWrapper({
    apiKey: ('AIzaSyDeLhksMwK4S5h3ZKNrYYPsPPedZuHxdlw')
})(_PlaceDetails))
