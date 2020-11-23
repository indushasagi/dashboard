import React, { useState, useCallback, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Cartlist from './Cartlist';

const Header = () => {
    const { isAuthenticated, signout, addProductToCart, removeFromCart } = useContext(AppContext);
    const [show, setShow] = useState(false);

    const showModal = useCallback(() => {
        addProductToCart.length > 0 ?
            setShow(true) : setShow(false);
    }, [setShow, addProductToCart]);

    const hideModal = useCallback(() => {
        setShow(false);
    }, [setShow]);

    return (
        <>
            <div className="App-header">
                {isAuthenticated === true && <span className="headerIcon" style={{ color: 'brown' }} onClick={signout} title="Sign Out"> <FontAwesomeIcon icon={faSignOutAlt} className="fa-lg " /></span>}
                {isAuthenticated === true && <span className="headerIcon fa-stack has-badge" data-count={addProductToCart.length} style={{ color: 'white' }} title="Cart" onClick={showModal}> <FontAwesomeIcon icon={faShoppingCart} className="fa-lg" /> </span>}
            </div>
            {addProductToCart.length > 0 && <Cartlist show={show} handleClose={hideModal} addProductToCart={addProductToCart} removeFromCart={removeFromCart} />}
        </>
    )
}

export default Header;