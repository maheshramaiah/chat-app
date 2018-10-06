import { createSelector } from 'reselect';

const registerFields = state => state.auth.register.form;
const showLoaderFlag = state => state.auth.register.showLoader;
const registerStatus = state => state.auth.register.registerStatus;

export const getFormFields = createSelector(
    [registerFields],
    (fields) => fields
);

export const getLoaderFlag = createSelector(
    [showLoaderFlag],
    (showLoaderFlag) => showLoaderFlag
);

export const getRegisterStatus = createSelector(
    [registerStatus],
    (registerStatus) => registerStatus
);