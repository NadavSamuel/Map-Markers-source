import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { BlackScreen } from './BlackScreen';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function Navbar() {
    const [isMenuShown, setIsMenuShown] = useState(false)
    const windowSize = useMediaQuery('(min-width:700px)');
    function closeMenu() {
        setIsMenuShown(false)
    }
    const isHideMenu = (isMenuShown ? '' : 'hide');
    const navbarLayout = (!windowSize ? 'column-layout mobile-links' : '');
    return (
        <header className="navbar flex align-center space-between  fill">
            <div className="navbar-container flex space-between full-width">
                <Link to="/" className="flex align-center full-width space-between"><img className='logo' src={require('../assets/imgs/logo.png')} alt="" />
                <MenuIcon onClick={() => setIsMenuShown(true)} className='phone-view ' ></MenuIcon></Link>
                <div className={`main-nav-container flex space-between full-width align-center justify-end ${isHideMenu}`}>
                    <ul className={`clean-list flex  full-view clean-link-list ${navbarLayout}`} >
                        <Link to="/about" onClick={closeMenu}><li>About</li></Link>
                    </ul>
                </div>
            </div>
            {isMenuShown && <BlackScreen closeMenu={closeMenu} />}

        </header>

    )
}
