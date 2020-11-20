import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

function PrivateRoute({ children, ...rest }) {
    const { isAuthenticated } = useContext(AppContext);
    return (
        <Route {...rest} render={() => {
            return isAuthenticated === true ? children : <Redirect to="/" />
        }} />
    )
}

export default PrivateRoute;