import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout.js');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.tryAutoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const MapPropsToState = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const MapDispatchToState = (dispatch) => {
    return {
        tryAutoLogin: () => dispatch(action.checkAuthState())
    };
};

export default connect(MapPropsToState, MapDispatchToState)(App);
