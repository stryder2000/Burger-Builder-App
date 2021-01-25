import React, { Component } from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkoutSummary = this.props.ingredients ? <CheckoutSummary 
        ingredients={this.props.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}/> : <Spinner />;
        return (
            <div>
                {checkoutSummary}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(MapStateToProps)(Checkout);