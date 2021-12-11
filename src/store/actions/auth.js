import axios from 'axios';
import {USR_ADDR_URL} from "../../constants";
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

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        let url = USR_ADDR_URL + '/auth';
        axios.post(url, authData)
            .then(response => {
                window.alert(`Got token: ${response.data.token}`);
                localStorage.setItem('token', response.data.token);
                console.log(typeof(response.data.user));
                console.log(typeof(JSON.stringify(response.data.user)));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch(authSuccess(response.data.token, response.data.user));
            })
            .catch(err => {
                window.alert(err.response.data);    // should show message defined in auth() in app.py
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