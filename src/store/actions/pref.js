import axios from "axios";
import * as actionTypes from "./actionTypes";


const getPrefSuccess = (pref) => {
    return {
        type: actionTypes.GET_PREF_SUCCESS,
        pref
    };
};


const getPrefFail = (error) => {
    return {
        type: actionTypes.GET_PREF_FAIL,
        error
    };
};


const updatePrefSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_PREF_SUCCESS,
        data
    };
};


const updatePrefFail = (error) => {
    return {
        type: actionTypes.UPDATE_PREF_FAIL,
        error
    };
};


const USER_PREF_URL = 'http://localhost:5000/profile'

export const getPref = (prefId) => {
    return dispatch => {
        if (prefId === undefined || prefId === null) {
            dispatch(getPrefFail(Error('User preference ID must not be empty!')));
        }
        axios.get(USER_PREF_URL + `/${prefId}`)
            .then(res => {
                dispatch(getPrefSuccess(res.data));
            })
            .catch(err => {
                dispatch(getPrefFail(err));
            });
    }
};

export const updatePref = (pref) => {
    return dispatch => {
        const prefId = pref.prefId;
        const data = { profile: pref };
        if (prefId !== undefined && prefId !== null) {
            delete data.profile.prefId;
            axios.put(USER_PREF_URL + `/${prefId}`, data)
                .then((res) => {
                    dispatch(updatePrefSuccess(res.data));
                })
                .catch(err => dispatch(updatePrefFail(err)));
        } else {
            axios.post(USER_PREF_URL, data)
                .then((res) => {
                    dispatch(updatePrefSuccess(res.data));
                })
                .catch(err => dispatch(updatePrefFail(err)));
        }
    };
};
