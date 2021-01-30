import * as actionTypes from "./../actions/actionTypes";
import { updateObject } from "./../utility";

const initialState = {
    token: null,
    userId: null,
    loading: null,
    error: null,
    showError: false
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
        case actionTypes.ERROR_CONFIRMED:
            return updateObject(state, {
                showError: false
            });
        default:
            return state;
    }
};

export default reducer;
