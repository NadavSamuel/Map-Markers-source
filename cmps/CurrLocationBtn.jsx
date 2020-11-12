import React from 'react';
import { useDispatch } from 'react-redux'
import { setNotification } from '../actions/notificationActions'
import { setCenter } from '../actions/placeActions'

export function CurrLocationBtn(props) {
    const dispatch = useDispatch()
    function onSetCurrLocation() {

        function setCurrLocation(pos) {
            const position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            dispatch(setCenter(position))
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