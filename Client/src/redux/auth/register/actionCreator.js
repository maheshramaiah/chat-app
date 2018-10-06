import * as types from './actionTypes.js';

export default {
    onFieldTextChange(key, val) {
        return {
            type: types.ON_REGISTER_FIELD_TEXT_CHANGE,
            key,
            val
        };
    },
    onRegister() {
        return {
            type: types.ON_REGISTER
        };
    },
    setRegisterApiStatus(res) {
        return {
            type: types.SET_REGISTER_API_STATUS,
            res
        };
    }
}