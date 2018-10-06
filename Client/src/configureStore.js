import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './redux/rootReducer.js';

export default function configureStore() {
    return createStore(
        reducers,
        applyMiddleware(thunk, logger)
    );
}