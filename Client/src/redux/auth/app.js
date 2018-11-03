import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './app.scss';
import Login from './login/app';
import Register from './register/app';

const Auth = ({ match }) => {
    return (
        <div className="auth-container">
            <Route exact path={`${match.path}\/`} render={() => <Redirect to={{ pathname: `${match.path}/login` }} />}></Route>
            <Route path={`${match.path}/login`} component={Login}></Route>
            <Route path={`${match.path}/register`} component={Register}></Route>
        </div>
    );
};

export default Auth;