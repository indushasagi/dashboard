import React, { useState, useCallback, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
    const { authenticate } = useContext(AppContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const validateChange = useCallback((event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }, [setEmail, setPassword]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const details = JSON.parse(localStorage.getItem('createAccount'));
        if (email !== details.email || password !== details.password) {
            setLoginError('Invalid Credentials');
        } else {
            authenticate();
            history.push('/dashboard');
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" value={email} name="email" placeholder="Enter email" onChange={validateChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} name="password" placeholder="Password" onChange={validateChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <p> {loginError}</p>
                            <Link to="/signup">Sign UP</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;