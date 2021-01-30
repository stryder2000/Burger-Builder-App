import React, { Component } from "react";
import Auxilliary from "../Auxilliary/Auxilliary";
import classes from "./Layout.css";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Auxilliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggleSideDrawer={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxilliary>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(MapStateToProps)(Layout);
