import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    loading: null,
    error: null,
    showError: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                loading: true,
                error: null,
                showError: false
            });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                loading: false,
                error: null,
                showError: false
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
                showError: true
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null
            });
        case actionTypes.ERROR_CONFIRMED:
            return updateObject(state, {
                showError: false
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.path
            });
        default:
            return state;
    }
};

export default reducer;
