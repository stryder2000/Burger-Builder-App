import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.css';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount = () => {
        axios.get('/orders.json')
        .then(res => {
                let fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            }
        )
        .catch(err => (this.setState({loading: false})));
    }
    render(){
        return(
            <div className={classes.Orders}>
                {
                    this.state.orders.map(order => {
                        return(
                            <Order
                                key = {order.id}
                                ingredients = {order.ingredients}
                                price = {order.price}
                            /> 
                        );
                    })
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);