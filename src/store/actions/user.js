import axios from 'axios';

import * as actionTypes from './actionTypes';
import {USR_ADDR_URL, USR_REVIEW_URL} from "../../constants";


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
        const url = `${USR_ADDR_URL}/users`;
        axios.post(url, userData)
            .then(response => {
                dispatch(userRegisterSuccess());
            })
            .catch(err => {
                dispatch(userRegisterFail(err));
            });
    };
};

export const register2 = (userData) => {
    return new Promise((resolve, reject) => {
        const url = `${USR_ADDR_URL}/users`;
        axios.post(url, userData)
            .then(response => {
                return resolve(userRegisterSuccess(response.data));
            })
            .catch(err => {
                reject(userRegisterFail(err));
            });
    })
};

export const getUsersSuccess = (paginatedResult) => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        paginatedResult: paginatedResult
    };
};


export const getUsersFail = (error) => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error
    };
};

export const getUsers = (page = null, itemsPerPage = null, userParams = null, likesParam = null) => {
    return dispatch => {

        let params = {};

        if (page != null && itemsPerPage != null) {
            params['pageNumber'] = page;
            params['pageSize'] = itemsPerPage;
        }

        if (userParams != null) {
            params['minAge'] = userParams.minAge;
            params['maxAge'] = userParams.maxAge;
            params['gender'] = userParams.gender;
            params['orderBy'] = 'lastActive';
        }

        if (likesParam === 'Likers') {
            params['Likers'] = 'true';
        }

        if (likesParam === 'Likees') {
            params['Likees'] = 'true';
        }

        let token = localStorage.getItem('token');
        let url = 'http://localhost:3006/users';

        axios.get(url, { 
            headers: {"Authorization" : `Bearer ${token}`}, 
            params: params
        })
        .then(response => {
            let paginatedResult = {};
            paginatedResult.users = response.data;
            if (response.headers['pagination'] != null) {
                paginatedResult.pagination = JSON.parse(response.headers['pagination']);
            }
            dispatch(getUsersSuccess(paginatedResult));
        })
        .catch(err => {
            dispatch(getUsersFail(err));
        });
    };
};

export const sendLikeSuccess = () => {
    return {
        type: actionTypes.SEND_LIKE_SUCCESS
    };
};

export const sendLikeFail = (error) => {
    return {
        type: actionTypes.SEND_LIKE_FAIL,
        error: error
    };
};

export const sendLike = (id, recipientId) => {
    return dispatch => {
        let url = 'http://localhost:3006/users/' + id + '/like/' + recipientId;
        let token = localStorage.getItem('token');
        axios.post(url, {}, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(() => {
            dispatch(sendLikeSuccess());
        })
        .catch(err => {
            dispatch(sendLikeFail(err));
        });
    }
}

export const getMessagesSuccess = (paginatedResult) => {
    return {
        type: actionTypes.GET_MESSAGES_SUCCESS,
        paginatedResult: paginatedResult
    };
};

export const getMessagesFail = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAIL,
        error: error
    };
};

export const getMessages = (id, page = null, itemsPerPage = null, messageContainer = null) => {
    return dispatch => {

        let params = {};

        if (page != null && itemsPerPage != null) {
            params['pageNumber'] = page;
            params['pageSize'] = itemsPerPage;
        }

        params['MessageContainer'] = messageContainer;

        let url = 'http://localhost:3006/users/' + id + '/messages/';
        let token = localStorage.getItem('token');
        axios.get(url, { 
            headers: {"Authorization" : `Bearer ${token}`}, 
            params: params
        })
        .then(response => {
            let paginatedResult = {};
            paginatedResult.messages = response.data;
            if (response.headers['pagination'] != null) {
                paginatedResult.pagination = JSON.parse(response.headers['pagination']);
            }
            dispatch(getMessagesSuccess(paginatedResult));
        })
        .catch(err => {
            dispatch(getMessagesFail(err));
        });
    }
}

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
                    dispatch(getUserSuccess(response.data));                    
                })
            })
        })
        .catch(err => {
            dispatch(getUserFail(err));
        });
    }
}

export const getMessagesThreadSuccess = (messages) => {
    return {
        type: actionTypes.GET_MESSAGES_THREAD_SUCCESS,
        messages: messages
    };
};

export const getMessagesThreadFail = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_THREAD_FAIL,
        error: error
    };
};

export const getMessageThread = (id, recipientId) => {

    return dispatch => {

        let url = 'http://localhost:3006/users/' + id + '/messages/thread/' + recipientId;
        let token = localStorage.getItem('token');

        axios.get(url, { headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {

            let messages = response.data;
            if (messages && messages.length > 0) {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].isRead === false && messages[i].recipientId === id) {
                        markAsRead(id, messages[i].id);
                    }
                }
            }
            dispatch(getMessagesThreadSuccess(response.data));
        })
        .catch(err => {
            dispatch(getMessagesThreadFail(err));
        });
    }    
}

export const markAsRead = (userId, messageId) => {
    let url = 'http://localhost:3006/users/' + userId + '/messages/' + messageId + '/read';
    let token = localStorage.getItem('token');
    axios.post(url, {}, { headers: {"Authorization" : `Bearer ${token}`}});
}

export const sendMessageSuccess = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        message: message
    };
};

export const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    };
};

export const sendMessage = (id, message) => {
    return dispatch => {
        let url = 'http://localhost:3006/users/' + id + '/messages';
        let token = localStorage.getItem('token');
        axios.post(url, message, { headers: {"Authorization" : `Bearer ${token}`}})
        .then((response) => {
            console.log('Response: ' + response);
            dispatch(sendMessageSuccess(message));
        })
        .catch(err => {
            console.log(err);
            dispatch(sendMessageFail(err));
        });
    }
}