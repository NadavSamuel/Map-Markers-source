import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {   savePlace } from '../actions/placeActions.js';
import { setNotification } from '../actions/notificationActions'
function ResturantCard({ resturant }) {
    const dispatch = useDispatch()
    const { vicinity, name,photos,permanently_closed,geometry} = resturant
    const photoReference = photos ? photos[0].photo_reference : null
    let imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photoReference}&key=AIzaSyARhJCj-KdXS-t0qh0QBlZLvhzJlyQ36EQ` || require('../assets/imgs/logo.png')
    const isExsictingNotification = useSelector(state => state.notificationReducer.txt);

    function onSetResturantOnMap(){
        const newMapMarker ={
            position:geometry.location,
            title:name,
            description:''
        }
        try{
            dispatch(savePlace(newMapMarker)) 
            dispatch(setNotification('success', `Successfully set "${name}" on map`,!!isExsictingNotification))
        }
        catch{
            dispatch(setNotification('err', `OOPS! something went wrong, could'nt set this resturant on map`,!!isExsictingNotification))
        }
    }
    const img =React.createRef()
    function onImgError(){

        img.current.src =  require('../assets/imgs/logo.png')
        img.current.className="default-img"
    }



    if (permanently_closed) return null
    return (
        <article className="resturant-card flex">
            <div className="resturant-img-container">
           <img ref={img} src={imgUrl} onError={onImgError} alt=""/>
           </div>
            <div className="resturant-details full-width">
                <h3 className="resturant-title">{name}</h3>
                <p>{vicinity}</p>
                <br/>
                <button onClick={onSetResturantOnMap}>Set on map</button>

            </div>
        </article>
    );
}

export default ResturantCard;