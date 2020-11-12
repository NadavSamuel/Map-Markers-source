import React, { useState } from 'react';
import { PlaceDetails } from '../cmps/PlaceDetails'
import { EditPlace } from '../cmps/EditPlace'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { loadPlaces,savePlace,selectPlace } from '../actions/placeActions.js';
import { useDispatch, useSelector } from 'react-redux'


export function PlaceModal(props) {
    const place = useSelector(state => state.placeReducer.selectedPlace);
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false);
    
    async function toggleEdit(ev, editedPlace = null) {
        if (editedPlace) {
            ev.preventDefault()
            dispatch(savePlace(editedPlace))
            dispatch(selectPlace(editedPlace._id))
            dispatch(loadPlaces())
        }
        setIsEdit(!isEdit)
    }

    function onCloseModal(){
        dispatch(selectPlace(null))
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
            overflow: 'scroll',
            cursor: 'pointer'
        },
        paper: {
            cursor: 'auto',
            position: 'absolute',
            maxWidth: 400,
            minHeight: 500,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            left: 0,
            right: 0,
            top: '40px',
            margin: '0 auto',
            [theme.breakpoints.down('xs')]: {
                maxWidth: 300,
            },
        },
    }));

    const classes = useStyles();

    if (!place) return <div>Loading...</div>
    return (
        <Modal
            open={!!place}
            onClose={onCloseModal}
            className={classes.modal}>
            <section className={`${classes.paper} column-layout`}>
                <button className="close-btn align-self-start" onClick={onCloseModal}></button>
                {isEdit ? <EditPlace toggleIsEdit={toggleEdit} classes={classes} place={place} /> :
                    <PlaceDetails onCloseModal={onCloseModal} toggleIsEdit={(event) => toggleEdit(event)} classes={classes}  place={place} />}
            </section>

        </Modal>
    );

}

