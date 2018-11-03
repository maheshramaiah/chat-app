import actionCreator from './actionCreator';
import AjaxUtils from '../../../utils/ajaxUtils';

export function register(data) {
    return async (dispatch) => {
        dispatch(actionCreator.onRegister());
        const res = await AjaxUtils.fetch('/api/register', 'POST', data);
        dispatch(actionCreator.setRegisterApiStatus(res));

        return res;
    }
}