import { createSelector } from 'reselect';

const loginFields = state => state.auth.login.form;
const showLoaderFlag = state => state.auth.login.showLoader;
const loginStatus = state => state.auth.login.loginStatus;

export const getFormFields = createSelector(
    [loginFields],
    (fields) => fields
);

export const getLoaderFlag = createSelector(
    [showLoaderFlag],
    (showLoaderFlag) => showLoaderFlag
);

export const getLoginStatus = createSelector(
    [loginStatus],
    (loginStatus) => loginStatus
);