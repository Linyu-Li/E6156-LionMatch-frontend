import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    users: null,
    pagination: null,
    messages: null,
    userDetail: null,
    messageThread: null
};

const userRegisterStart = ( state, action ) => {
    return updateObject( state, { error: null } );
};

const userRegisterSuccess = (state, action) => {
    return updateObject( state, { error: null } );
};

const userRegisterFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const getUsersSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        users: action.paginatedResult.users,
        pagination: action.paginatedResult.pagination
    });
};

const getUsersFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const sendLikeSuccess = (state, action) => {
    return updateObject( state, {
        error: null
    });
};

const sendLikeFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const getMessagesSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        messages: action.paginatedResult.messages,
        pagination: action.paginatedResult.pagination
    });
};

const getMessagesFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const getUserSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        userDetail: action.user
    });
};

const getUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const getMessagesThreadSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        messageThread: action.messages
    });
};

const getMessagesThreadFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const sendMessageSuccess = (state, action) => {
    let messages = [...state.messageThread];
    messages.unshift(action.message);
    return updateObject( state, {
        error: null,
        messageThread: messages
    });
};

const sendMessageFail = (state, action) => {
    return updateObject( state, {
        error: action.error
    });
};

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return userRegisterStart(state, action);
        case actionTypes.AUTH_SUCCESS: return userRegisterSuccess(state, action);
        case actionTypes.AUTH_FAIL: return userRegisterFail(state, action);
        case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action);
        case actionTypes.GET_USERS_FAIL: return getUsersFail(state, action);
        case actionTypes.SEND_LIKE_SUCCESS: return sendLikeSuccess(state, action);
        case actionTypes.SEND_LIKE_FAIL: return sendLikeFail(state, action);
        case actionTypes.GET_MESSAGES_SUCCESS: return getMessagesSuccess(state, action);
        case actionTypes.GET_MESSAGES_FAIL: return getMessagesFail(state, action);
        case actionTypes.GET_USER_SUCCESS: return getUserSuccess(state, action);
        case actionTypes.GET_USER_FAIL: return getUserFail(state, action);
        case actionTypes.GET_MESSAGES_THREAD_SUCCESS: return getMessagesThreadSuccess(state, action);
        case actionTypes.GET_MESSAGES_THREAD_FAIL: return getMessagesThreadFail(state, action);
        case actionTypes.SEND_MESSAGE_SUCCESS: return sendMessageSuccess(state, action);
        case actionTypes.SEND_MESSAGE_FAIL: return sendMessageFail(state, action);
        default:
            return state;
    }
};

export default userReducer;