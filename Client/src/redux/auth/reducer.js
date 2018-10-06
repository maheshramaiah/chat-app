import { combineReducers } from 'redux';
import login from './login/reducer.js';
import register from './register/reducer.js';

const rootReducer = combineReducers({
    login,
    register
});

export default rootReducer;