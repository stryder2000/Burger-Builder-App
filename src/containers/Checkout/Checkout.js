import React, { Component } from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const checkoutRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        let summary = this.props.ingredients ? (
            <div>
                {checkoutRedirect}
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
         ) : <Redirect to='/' />;
        return summary;
    }
}

const MapStateToProps = state => {
    return {
        ingredients: state.bgr.ingredients,
        purchased: state.odr.purchased
    };
}

export default connect(MapStateToProps)(Checkout);