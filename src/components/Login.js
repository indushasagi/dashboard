import React, { useState, useCallback, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext';

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
        if (email !== "admin" || password !== "admin") {
            setLoginError('Invalid Credentials');
        } else {
            authenticate();
            history.push('/dashboard');
        }
    }

    return (
        <>
            <div className="App">
                <form className="controls" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email address </label>
                        <input type="text" value={email} name="email" className="input-group" onChange={validateChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password </label>
                        <input type="password" value={password} name="password" className="input-group" onChange={validateChange} />
                    </div>
                    <button className="btn" type="submit">Submit</button>
                    <p> {loginError}</p>
                    <Link to="/signup">Sign UP</Link>
                </form>
            </div>
        </>
    )
}

export default Login;