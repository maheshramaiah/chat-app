import actionCreator from './actionCreator.js';
import AjaxUtils from '../../../utils/ajaxUtils.js';

export function register(data) {
    return async (dispatch) => {
        dispatch(actionCreator.onRegister());
        const res = await AjaxUtils.fetch('/api/register', 'POST', data);
        dispatch(actionCreator.setRegisterApiStatus(res));

        return res;
    }
}