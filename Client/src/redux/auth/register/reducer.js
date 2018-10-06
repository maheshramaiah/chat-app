import * as types from './actionTypes.js';

const initialState = {
    form: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    },
    showLoader: false,
    registerStatus: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ON_REGISTER_FIELD_TEXT_CHANGE: {
            const { key, val } = action;

            return {
                ...state,
                form: {
                    ...state.form,
                    [key]: val
                }
            };
        }

        case types.ON_REGISTER: {
            return { ...state, showLoader: true, registerStatus: {} };
        }

        case types.SET_REGISTER_API_STATUS: {
            return { ...state, showLoader: false, registerStatus: action.res };
        }

        default: return state;
    }
}