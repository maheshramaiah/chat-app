import { combineReducers } from 'redux';
import auth from './auth/reducer';
import dashboard from './dashboard/reducer';

const rootReducer = combineReducers({
    auth,
    dashboard
});

export default rootReducer;