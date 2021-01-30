import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const formData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIPg-zS-WLDCdS11P4jKPZt6w95Wjs5OI";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIPg-zS-WLDCdS11P4jKPZt6w95Wjs5OI";
        }
        axios
            .post(url, formData)
            .then((response) => {
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const errorConfirmed = () => {
    return {
        type: actionTypes.ERROR_CONFIRMED
    };
};
