import { combineReducers } from 'redux';
import login from './login/reducer';
import register from './register/reducer';

const rootReducer = combineReducers({
    login,
    register
});

export default rootReducer;