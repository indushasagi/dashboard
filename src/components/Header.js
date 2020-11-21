import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { isAuthenticated, signout, addProductToCart } = useContext(AppContext);
    return (
        <>
            <div className="App-header">
                {isAuthenticated === true && <span className="headerIcon" style={{ color: 'brown' }} onClick={signout} title="Sign Out"> <FontAwesomeIcon icon={faSignOutAlt} className="fa-lg " /></span>}
                {isAuthenticated === true && <span className="headerIcon fa-stack has-badge" data-count={addProductToCart.length} style={{ color: 'white' }} title="Cart" > <FontAwesomeIcon icon={faShoppingCart} className="fa-lg" /> </span>}
            </div>
        </>
    )
}

export default Header;