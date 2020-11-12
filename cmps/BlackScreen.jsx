import React from 'react'

export function BlackScreen({ closeMenu }) {

    return (
        <div onClick={() => closeMenu()} className= "black-screen"></div>
    )
}
