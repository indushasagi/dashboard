import React, { useState, useReducer, useCallback } from 'react';
import { Link } from "react-router-dom";

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
        <div className="App">
            <form className="controls" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">First Name </label>
                    <input type="text" value={formData['firstName'] ? formData['firstName'] : ""} name="firstName" className="input-group" onChange={onTextChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name </label>
                    <input type="text" value={formData['lastName'] ? formData['lastName'] : ""} name="lastName" className="input-group" onChange={onTextChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Email address </label>
                    <input type="email" value={formData['email'] ? formData['email'] : ""} name="email" className="input-group" onChange={onTextChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Password </label>
                    <input type="password" value={formData['password'] ? formData['password'] : ""} name="password" className="input-group" onChange={onTextChange} />
                </div>
                <div>
                    <span>{passwordLenCheck}</span>
                </div>
                <button className="btn" type="submit">Signup</button>
                {successmsg && <p>Account Created Successfully !!!!!</p>}
                {successmsg && <p><Link to="/">Click to Login</Link></p>}
            </form>
        </div>
    )
}

export default Signup;