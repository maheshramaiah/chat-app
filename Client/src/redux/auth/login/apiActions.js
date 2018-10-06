import actionCreator from './actionCreator.js';
import AjaxUtils from '../../../utils/ajaxUtils.js';

export function login(data) {
    return async (dispatch) => {
        dispatch(actionCreator.onLogin());
        const res = await AjaxUtils.fetch('/api/login', 'POST', data);
        dispatch(actionCreator.setLoginApiStatus(res));

        return res;
    }
}