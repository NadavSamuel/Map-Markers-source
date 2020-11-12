import React, { useEffect, useRef } from 'react';
import { fadeInDown, fadeOutUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../actions/notificationActions.js'
// import ClearIcon from '@material-ui/icons/Clear';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

export function Notification(props) {
    const dispatch = useDispatch()
    let notificationLifeCycle = null


    useEffect(() => {
        notificationLifeCycle = setTimeout(() => {
            dispatch(clearNotification())
        }, 4000)
        return () =>{
            clearTimeout(notificationLifeCycle)
        }
    })
    const { kind, txt } = useSelector(state => state.notificationReducer);
    const notificationBox = useRef(null)

    const styles = {
        fadeInDown: {
            animation: 'x 0.5s',
            animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
        }
    }
    return (

        <StyleRoot>
            <div ref={notificationBox} style={styles.fadeInDown} className={`notification-box ${kind}`}>
                <p>
                    {txt}
                </p>
            </div>
        </StyleRoot >

    )

}
