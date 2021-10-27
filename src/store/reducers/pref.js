import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const defaultState = {
    curPref: null,
    error: null,
}

const prefReducer = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_PREF_SUCCESS: return updateObject(defaultState, { curPref: action.pref });
        case actionTypes.GET_PREF_FAIL: return updateObject(defaultState, { error: action.error });
        case actionTypes.UPDATE_PREF_SUCCESS: return state;
        case actionTypes.UPDATE_PREF_FAIL: return updateObject(defaultState, { error: action.error });
        default:
            return state;
    }
};

export default prefReducer;