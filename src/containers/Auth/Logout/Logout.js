import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "./../../../store/actions/index";

class Logout extends Component {
    componentDidMount = () => {
        this.props.setAuthRedirectPath("/");
        this.props.logoutHandler();
    };
    render() {
        return <Redirect to="/" />;
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: () => dispatch(actions.authLogout()),
        setAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(null, MapDispatchToProps)(Logout);
