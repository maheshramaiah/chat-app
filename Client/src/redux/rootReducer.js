import { combineReducers } from 'redux';
import auth from './auth/reducer.js';
import dashboard from './dashboard/reducer.js';

const rootReducer = combineReducers({
    auth,
    dashboard
});

export default rootReducer;