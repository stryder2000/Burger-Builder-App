import React, { Component } from "react";
import Order from "./../../components/Order/Order";
import axios from "./../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";
import classes from "./Orders.css";

class Orders extends Component {
    componentDidMount = () => {
        this.props.fetchOrderHandler(this.props.token);
    };
    render() {
        let orders = this.props.loading ? (
            <Spinner />
        ) : (
            this.props.orders.map((order) => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                );
            })
        );
        return <div className={classes.Orders}>{orders}</div>;
    }
}

const MapPropsToState = (state) => {
    return {
        orders: state.odr.orders,
        token: state.auth.token
    };
};

const MapDispatchToState = (dispatch) => {
    return {
        fetchOrderHandler: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(
    MapPropsToState,
    MapDispatchToState
)(withErrorHandler(Orders, axios));
