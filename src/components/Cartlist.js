import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const Cartlist = ({ handleClose, show, addProductToCart, removeFromCart, onQuantityChange }) => {
    const [subTotal, setSubTotal] = useState(0);

    // const onTextChange = useCallback((event) => {
    //     const eventName = event.target.name;
    //     dispatch({ type: "APPEND", payload: { [eventName]: event.target.value } });
    // }, [dispatch]);

    // const onTextChange = useCallback((event) => {
    //     const eventName = event.target.name;

    // }, [dispatch]);

    useEffect(() => {
        let totalPrice = 0;
        addProductToCart.map((data) => {
            totalPrice = parseInt(totalPrice) + parseInt((data.price) * (data.quantity));
            return (
                setSubTotal(totalPrice)
            )
        });
    });

    const displayCartItem =
        addProductToCart.map((data, i) => {
            const name = `${data.brand}_${data.name}`;
            return (
                <tr key={i}>
                    <td>{data.name}</td>
                    <td>${data.price}</td>
                    <td><input type="number" min="1" value={data.quantity} name={name} onChange={(event) => onQuantityChange(event, data.id)} style={{ width: '65%', marginLeft: '16%' }} /></td>
                    <td>{(data.price) * (data.quantity)}</td>
                    <td><span name={data.id} onClick={() => removeFromCart(data.id)}><Trash style={{ color: 'red', cursor: 'pointer' }} /></span></td>
                </tr>
            )
        });

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div>
                    <Table responsive="sm" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>RemoveItem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayCartItem}
                        </tbody>
                    </Table>
                    <p style={{ textAlign: 'center' }}><b>SubTotal : ${subTotal}</b></p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Cartlist;