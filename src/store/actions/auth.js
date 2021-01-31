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

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime);
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
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
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

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            //console.log(expirationDate.getTime());
            if (expirationDate < new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem("userId");
                const time = new Date(
                    expirationDate.getTime() - new Date().getTime()
                ).getTime();

                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(time));
            }
        }
    };
};
