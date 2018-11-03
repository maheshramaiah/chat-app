import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);