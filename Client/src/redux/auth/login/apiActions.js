import actionCreator from './actionCreator';
import AjaxUtils from '../../../utils/ajaxUtils';

export function login(data) {
    return async (dispatch) => {
        dispatch(actionCreator.onLogin());
        const res = await AjaxUtils.fetch('/api/login', 'POST', data);
        dispatch(actionCreator.setLoginApiStatus(res));

        return res;
    }
}