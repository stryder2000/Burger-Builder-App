import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Orders.css';
import Button from './../../components/UI/Button/Button';

class Orders extends Component {
    componentDidMount = () => {
        this.props.fetchOrderHandler(this.props.token, this.props.userId);
    };
    render() {
        let returnValue = this.props.loading ? (
            <Spinner />
        ) : this.props.orders && this.props.orders.length !== 0 ? (
            <div className={classes.Orders}>
                <center>
                    <Button
                        BtnType="Danger"
                        clicked={() =>
                            this.props.deleteAllOrders(
                                this.props.token,
                                this.props.userId
                            )
                        }
                    >
                        DELETE ALL PREVIOUS ORDERS
                    </Button>
                </center>
                {this.props.orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            orderId={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                            deleteOrderHandler={this.props.deleteOrder}
                            token={this.props.token}
                        />
                    );
                })}
            </div>
        ) : (
            <div>
                <center>
                    <b>NO PREVIOUS ORDERS FOUND</b>
                </center>
            </div>
        );
        return returnValue;
    }
}

const MapPropsToState = (state) => {
    return {
        orders: state.odr.orders,
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.odr.loading
    };
};

const MapDispatchToState = (dispatch) => {
    return {
        fetchOrderHandler: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId)),
        deleteAllOrders: (token, userId) =>
            dispatch(actions.deleteAllOrdersHandler(token, userId)),
        deleteOrder: (token, orderId) =>
            dispatch(actions.deleteOrderHandler(token, orderId))
    };
};

export default connect(
    MapPropsToState,
    MapDispatchToState
)(withErrorHandler(Orders, axios));
