import axios from "axios";
import * as actionTypes from "./actionTypes";
import {USR_REVIEW_URL} from "../../constants";


const MAX_REVIEW_DISPLAY = 1

const getReviewSuccess = (review) => {
    return {
        type: actionTypes.GET_REVIEW_SUCCESS,
        review
    };
};


const getReviewFail = (error) => {
    return {
        type: actionTypes.GET_REVIEW_FAIL,
        error
    };
};


const addReviewSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_REVIEW_SUCCESS,
        data
    };
};


const addReviewFail = (error) => {
    return {
        type: actionTypes.UPDATE_REVIEW_FAIL,
        error
    };
};


export const getReview = () => {
    return dispatch => {
        axios.get(`${USR_REVIEW_URL}/reviews`)
            .then(res => {
            	res = res.data
                dispatch(getReviewSuccess(res));
            })
            .catch(err => {
                dispatch(getReviewFail(err));
            });
    }
};

export const getUserReview = (userId) => {
    return dispatch => {
        if (userId === undefined || userId === null) {
            dispatch(getReviewFail(Error('User UserReviewerence ID must not be empty!')));
        }
        axios.get(`${USR_REVIEW_URL}/users/${userId}/reviews`)
            .then(res => {
            	res = res.data
            	const reviews = []
            	res.sort((a,b)=> (b.freq - a.freq))
            	for (let i=0;i<MAX_REVIEW_DISPLAY;i++){
            		reviews.push(res[i].review)
            	}

                dispatch(getReviewSuccess(reviews.join(",")));
            })
            .catch(err => {
                dispatch(getReviewFail(err));
            });
    }
};

export const addReview = (userId, review) => {
    return dispatch => {
        // const prefId = userId;
        const data = { data: {review: review } };
        axios.post(`${USR_REVIEW_URL}/users/${userId}/reviews`, data)
            .then((res) => {
                dispatch(addReviewSuccess("done"));
                window.location.reload();
            })
            .catch(err => dispatch(addReviewFail(err)));
    };
};
