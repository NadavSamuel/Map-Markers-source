import React, { useState  } from 'react';
import InfoWindowEx from './InfoWindowEx'
import {deletePlace,savePlace} from '../actions/placeActions.js';
import{useForm} from '../services/customHooks'
import { useDispatch } from 'react-redux'


export function CustomInfoWindow({currPlace,showingInfoWindow,marker,onClose,onDeletePlace}) {
    const dispatch = useDispatch()

    const [isEditTitle, setisEditTitle] = useState(false)
    const infoWindowClass = isEditTitle ? 'edit-title flex' : 'info-window'
    const [placeToEdit,handleChange] = useForm({...currPlace})

    function toggleChangePlaceTitle(isNewTitle = false) {
        if (isNewTitle) dispatch(savePlace(placeToEdit))
        setisEditTitle(!isEditTitle)
      }
      
    return (
        <React.Fragment>
        <InfoWindowEx visible={true} marker={marker} onClose={onClose}>
            <div lcass="info-window" className={infoWindowClass}>
                {!isEditTitle ?
                    <React.Fragment><h2>{currPlace.title || 'No title yet'}</h2>
                        <div className="btns-container">
                            <button onClick={toggleChangePlaceTitle}>Change title</button>
                            <button onClick={() => onDeletePlace(marker._id)}>Delete</button>
                        </div>
                    </React.Fragment>
                    :
                    <form className="column-layout" onSubmit={() => toggleChangePlaceTitle(true)}>
                        <input autoFocus
                           placeholder="Enter place name" name="title" value={placeToEdit.title} onChange={handleChange} />
                        <button >Save new title</button>
                    </form>}

            </div>
        </InfoWindowEx>
        </React.Fragment>
    );
}

