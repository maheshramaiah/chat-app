import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './redux/auth/app.js';
import Dashboard from './redux/dashboard/app.js';
import Storage from './utils/storage.js';
import './style.scss';

function isLoggedIn() {
	return Storage.get('userInfo') != null;
}

const ProtectedRoutes = ({ path, component: Component }) => {
	return (
		<Route path={path} render={() => (
			isLoggedIn() ? <Component /> : <Redirect to='/auth' />
		)} />
	);
}

const App = ({ store }) => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" render={() => <Redirect to={{ pathname: '/auth' }} />} />
					<Route path="/auth" component={Auth} />
					<ProtectedRoutes path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
