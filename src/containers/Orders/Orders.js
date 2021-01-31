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
        this.props.fetchOrderHandler(this.props.token, this.props.userId);
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
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const MapDispatchToState = (dispatch) => {
    return {
        fetchOrderHandler: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(
    MapPropsToState,
    MapDispatchToState
)(withErrorHandler(Orders, axios));
