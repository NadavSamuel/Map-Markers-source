
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mainService } from '../services/mainService'
import {  loadPlaces, savePlace, removePlace } from '../actions/placeActions.js';
import { setNotification } from '../actions/notificationActions'
import InfoWindowEx from '../cmps/InfoWindowEx'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {setLoader} from '../actions/systemActions'

function _GoogleMap(props) {

  const dispatch = useDispatch()
  const [zoom, setZoom] = useState(7)
  const [activeMarker, setactiveMarker] = useState(null)
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [currPlace, setCurrPlace] = useState(null)
  const [isEditTitle, setisEditTitle] = useState(false)

  const { places, initialCenter, center } = useSelector(state => state.placeReducer);


  useEffect(() => {
    dispatch(setLoader())

    dispatch(loadPlaces())
    if (center) onSetZoom()
    dispatch(setLoader())

  }, [center])

  function onSetZoom() {
    setZoom(15)
    setTimeout(() => {
      setZoom(null)
    }, 10)

  }
  function handleInput(ev) {
    const { name, value } = ev.target;
    setCurrPlace({ ...currPlace, [name]: value })
    elTitleInput.current.focus()
  };
  const elTitleInput = React.createRef()

  async function onMapClick(mapProps, map, clickEvent) {
    const newPlace = {
      position: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      },
      title: '',
      description: ''
    }
    dispatch(savePlace(newPlace))
    dispatch(loadPlaces())
  }
  async function onMarkerClick(props, marker, clickEvent, currPlaceId) {
    const currPlace = await mainService.getById(currPlaceId)
    setCurrPlace(currPlace)
    setactiveMarker(marker)
    setShowingInfoWindow(true)
  }

  function getEmptyState() {
    setShowingInfoWindow(false)
    setactiveMarker(null)
    setCurrPlace(null)
    setisEditTitle(false)

  }
  function onInfoWindowClose() {
    getEmptyState()
  }
  const isExsictingNotification = useSelector(state => state.notificationReducer.txt);

  async function onDeletePlace() {
    const placeToDeleteId = currPlace._id
    const currPlaceTitle = currPlace.title || 'Unknown place'
    try {
      getEmptyState()
       dispatch(removePlace(placeToDeleteId))
       dispatch(loadPlaces)
       dispatch(setNotification('success', `Successfully deleted "${currPlaceTitle}"`,!!isExsictingNotification))
    } catch {
       dispatch(setNotification('err', `OOPS! something went wrong, could'nt delete ${currPlaceTitle}`))
    }
  }


  function toggleChangePlaceTitle(isNewTitle = false) {
    if (isNewTitle) dispatch(savePlace(currPlace))
    setisEditTitle(!isEditTitle)
  }
  const containerStyle = {
    width: '100%',
    height: '100%',
  }
  const style = {
    width: '100%',
    height: '100%'
  }
  const infoWindowClass = isEditTitle ? 'edit-title flex' : 'info-window'
  return (
    <div className="map-wraper">
      <Map style={style} containerStyle={containerStyle}
        google={props.google} zoom={zoom}
        onClick={onMapClick}
        initialCenter={initialCenter}
        center={center}>
        {places.map((place, idx) => {
          return <Marker key={place._id} onClick={(props, marker, clickEvent) => onMarkerClick(props, marker, clickEvent, place._id)}
            position={place.position} />

        })}
        {activeMarker && <InfoWindowEx visible={showingInfoWindow} marker={activeMarker} onClose={onInfoWindowClose}>
          <div lcass="info-window" className={infoWindowClass}>
            {!isEditTitle ?
              <React.Fragment><h2>{currPlace.title || 'No title yet'}</h2>
                <div className="btns-container">
                  <button onClick={toggleChangePlaceTitle}>Change title</button>
                  <button onClick={() => onDeletePlace(activeMarker._id)}>Delete</button>
                </div>
              </React.Fragment>
              :
              <form className="column-layout" onSubmit={() => toggleChangePlaceTitle(true)}>
                <input autoFocus
                  ref={elTitleInput} placeholder="Enter place name" name="title" value={currPlace.title} onChange={handleInput} />
                <button >Save new title</button>
              </form>}

          </div>
        </InfoWindowEx>}
      </Map>
    </div>
  );
}
export default (GoogleApiWrapper({
  apiKey: ('AIzaSyDeLhksMwK4S5h3ZKNrYYPsPPedZuHxdlw')
})(_GoogleMap))


