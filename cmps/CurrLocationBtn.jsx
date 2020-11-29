import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../actions/notificationActions'
import { setCenter, savePlace } from '../actions/placeActions'

export function CurrLocationBtn(props) {
    const dispatch = useDispatch()
    const { places } = useSelector(state => state.placeReducer);

    function onSetCurrLocation() {

        function setCurrLocation(pos) {
            const position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            try {
                dispatch(setCenter(position))
                const currPlaceInList = places.find(place => (place.position.lat === position.lat && place.position.lng === position.lng))
                if (!currPlaceInList) {
                   const newMarker = {
                        position,
                        title : 'Current place',
                        description : ''
                    }
                    dispatch(savePlace(newMarker))
                }
            }
            catch {
                dispatch(setNotification('err', `OOPS! Could'nt get your current location`))

            }

        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            dispatch(setNotification('err', `OOPS! Could'nt get your current location`))
        }
        navigator.geolocation.getCurrentPosition(setCurrLocation, error);
    }
    return (
        <button onClick={onSetCurrLocation} className="align-self-start">Set your location!</button>
    );
}