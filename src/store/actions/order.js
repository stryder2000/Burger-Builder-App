import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: order
    };
};

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (order, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());

        axios
            .post('/orders.json?auth=' + token, order)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, order));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseFinished = () => {
    return {
        type: actionTypes.PURCHASE_FINISHED
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        const queryParams =
            'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios
            .get('/orders.json?' + queryParams)
            .then((res) => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrderFail(err));
            });
    };
};
