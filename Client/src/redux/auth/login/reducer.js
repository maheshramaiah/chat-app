import * as types from './actionTypes.js';

const initialState = {
    form: {
        email: '',
        password: '',
    },
    showLoader: false,
    loginStatus: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ON_LOGIN_FIELD_TEXT_CHANGE: {
            const { key, val } = action;

            return {
                ...state,
                form: {
                    ...state.form,
                    [key]: val
                }
            };
        }

        case types.ON_LOGIN: {
            return { ...state, showLoader: true, loginStatus: {} };
        }

        case types.SET_LOGIN_API_STATUS: {
            return { ...state, showLoader: false, loginStatus: action.res };
        }

        default: return state;
    }
}