import * as actionTypes from './../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            const updatedState = {
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            };
            return updateObject(state, updatedState);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, { loading: true, error: false });
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, {
                error: true,
                loading: false
            });
        case actionTypes.DELETE_ORDER_START:
            return updateObject(state, {
                loading: true,
                error: false
            });
        case actionTypes.DELETE_ORDER_SUCCESS:
            if (action.orderId == null) {
                return updateObject(state, {
                    loading: false,
                    error: false,
                    orders: []
                });
            } else {
                let updatedOrders = [];
                for (let key in state.orders) {
                    if (state.orders[key].id !== action.orderId) {
                        updatedOrders.push(state.orders[key]);
                    }
                }
                return updateObject(state, {
                    loading: false,
                    error: false,
                    orders: updatedOrders
                });
            }

        case actionTypes.DELETE_ORDER_FAIL:
            return updateObject(state, {
                loading: false,
                error: true
            });
        default:
            return state;
    }
};

export default reducer;
