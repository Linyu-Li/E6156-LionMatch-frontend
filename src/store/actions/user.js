import axios from 'axios';

import * as actionTypes from './actionTypes';
import {USR_ADDR_URL, USR_REVIEW_URL, COMPOSITION_URL} from "../../constants";


const MAX_REVIEW_DISPLAY = 5

export const userRegisterStart = () => {
    return {
        type: actionTypes.USER_REGISTER_START
    };
};

export const userRegisterSuccess = (response) => {
    return {
        type: actionTypes.USER_REGISTER_SUCCESS,
        response
    };
};

export const userRegisterFail = (error) => {
    return {
        type: actionTypes.USER_REGISTER_FAIL,
        error: error
    };
};

export const register = (userData) => {
    return dispatch => {
        dispatch(userRegisterStart());
        // const url = `${USR_ADDR_URL}/users`;
        const url = `${COMPOSITION_URL}/create`
        axios.post(url, userData)
            .then(response => {
                dispatch(userRegisterSuccess());
            })
            .catch(err => {
                dispatch(userRegisterFail(err));
            });
    };
};

export const getUserSuccess = (user) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        user: user
    };
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        error: error
    };
};

export const getUser = (userId) => {
    return dispatch => {
        let url = `${USR_ADDR_URL}/users/` + userId;
        let token = localStorage.getItem('token');
        axios.get(url, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {
            axios.get(`${USR_REVIEW_URL}/users/${userId}/reviews`)
            .then(res => {
                res = res.data
                const reviews = []
                res.sort((a,b)=> (b.freq - a.freq))
                for (let i=0;i<Math.min(res.length,MAX_REVIEW_DISPLAY);i++){
                    reviews.push(res[i].review)
                }
                response.data.reviews = reviews.join(",")
                axios.get(`${USR_ADDR_URL}/address/${response.data.addressID}`)
                .then(res => {
                    response.data.postalCode = res.data.postalCode
                    axios.get(`${USR_ADDR_URL}/users/${userId}/weather`)
                    .then(res => {

                        response.data.current_weather = res.data.current_weather
                        response.data.current_temperature = res.data.current_temperature
                        dispatch(getUserSuccess(response.data));   
                    })
                                     
                })
            })
        })
        .catch(err => {
            dispatch(getUserFail(err));
        });
    }
}
