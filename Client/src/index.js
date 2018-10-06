import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import configureStore from './configureStore.js';

const store = configureStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);