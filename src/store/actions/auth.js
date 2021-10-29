import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        };
        let url = 'http://localhost:3006/users';
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch(authSuccess(response.data.token, JSON.stringify(response.data.user)));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {            
            const user = localStorage.getItem('user');
            dispatch(authSuccess(token, user));
        }
    };
};