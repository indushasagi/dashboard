import React, { useState, useReducer, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
const Signup = () => {

    const [formData, dispatch] = useReducer(store, {});
    const [passwordLenCheck, setPasswordLenCheck] = useState('');
    const [successmsg, setSuccessmsg] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccessmsg(true);
    }

    const onTextChange = useCallback((event) => {
        const eventName = event.target.name;
        const val = event.target.value;
        if (event.target.name === 'password' && (val.length < 6 || val.length > 6)) {
            setPasswordLenCheck('Password must contain 6 letter');
        } else {
            setPasswordLenCheck('');
        }
        dispatch({ type: "APPEND", payload: { [eventName]: event.target.value } });
    }, [dispatch]);
    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="text" value={formData['firstName'] ? formData['firstName'] : ""} name="firstName" placeholder="Enter FirstName" onChange={onTextChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" value={formData['lastName'] ? formData['lastName'] : ""} name="lastName" placeholder="Enter LastName" onChange={onTextChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={formData['email'] ? formData['email'] : ""} name="email" placeholder="Enter FirstName" onChange={onTextChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={formData['password'] ? formData['password'] : ""} name="password" placeholder="Enter Password" onChange={onTextChange} />
                        </Form.Group>
                        <p>{passwordLenCheck}</p>
                        <Button variant="primary" type="submit"> Signup </Button>
                        {successmsg && <p>Account Created Successfully !!!!!</p>}
                        {successmsg && <p><Link to="/">Click to Login</Link></p>}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup;