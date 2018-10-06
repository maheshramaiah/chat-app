import * as types from './actionTypes.js';

export default {
    onFieldTextChange(key, val) {
        return {
            type: types.ON_LOGIN_FIELD_TEXT_CHANGE,
            key,
            val
        };
    },
    onLogin() {
        return {
            type: types.ON_LOGIN
        };
    },
    setLoginApiStatus(res) {
        return {
            type: types.SET_LOGIN_API_STATUS,
            res
        };
    }
}