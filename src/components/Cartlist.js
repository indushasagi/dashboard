import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

function store(state, action) {
    switch (action.type) {
        case "APPEND":
            let data = action.payload;
            for (var key in data) {
                state[key] = data[key]
            }
            return { ...state };
        default:
            return { ...state }
    }

}

const Cartlist = ({ handleClose, show, addProductToCart, removeFromCart }) => {
    const [itemQuantity, dispatch] = useReducer(store, {});
    const [subTotal, setSubTotal] = useState(0);

    const onTextChange = useCallback((event) => {
        const eventName = event.target.name;
        dispatch({ type: "APPEND", payload: { [eventName]: event.target.value } });
    }, [dispatch]);

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    useEffect(() => {
        let totalPrice = 0;
        addProductToCart.map((data, i) => {
            const name = `${data.brand}_${data.name}`;
            totalPrice = parseInt(totalPrice) + parseInt(`${itemQuantity[name] ? (data.price) * (itemQuantity[name]) : data.price}`);
            return (
                setSubTotal(totalPrice)
            )
        });
    });

    const displayCartItem =
        addProductToCart.map((data, i) => {
            const name = `${data.brand}_${data.name}`;
            const totalPrice = `${itemQuantity[name] ? (data.price) * (itemQuantity[name]) : data.price}`;
            return (
                <tr key={i}>
                    <td>{data.name}</td>
                    <td>${data.price}</td>
                    <td><input type="number" min="1" value={itemQuantity[name] ? itemQuantity[name] : 1} name={name} onChange={(event) => onTextChange(event)} style={{ width: '65%', marginLeft: '16%' }} /></td>
                    <td>{totalPrice}</td>
                    <td><span name={data.id} onClick={() => removeFromCart(data.id)}><FontAwesomeIcon icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} className="fa-lg " /></span></td>
                </tr>
            )
        });

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose}><FontAwesomeIcon icon={faTimes} style={{ color: 'black' }} className="fa-lg " /></button>
                <div>
                    <table>
                        <thead className="thead">
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>RemoveItem</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {displayCartItem}
                        </tbody>
                    </table>
                    <p style={{ textAlign: 'center' }}><b>SubTotal : ${subTotal}</b></p>
                </div>
            </section>
        </div>
    );
};

export default Cartlist;