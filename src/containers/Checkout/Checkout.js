import React, { Component } from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        ingredients: null,
        TotalPrice: 0
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price=0;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, TotalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkoutSummary = this.state.ingredients ? <CheckoutSummary 
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}/> : <Spinner />;
        return (
            <div>
                {checkoutSummary}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            TotalPrice={this.state.TotalPrice}
                            {...this.props}
                        />
                        )} 
                />
            </div>
        );
    }
}

export default Checkout;