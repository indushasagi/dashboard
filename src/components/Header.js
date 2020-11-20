import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { isAuthenticated, signout } = useContext(AppContext);

    return (
        <>
            <div className="App-header">
                <span className="signOut" onClick={signout} title="Sign Out">{isAuthenticated === true && <FontAwesomeIcon icon={faSignOutAlt} className="fa-lg" />}</span>
            </div>
        </>
    )
}

export default Header;