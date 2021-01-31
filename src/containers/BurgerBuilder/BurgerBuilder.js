import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount = () => {
        if (this.props.purchased) {
            this.props.onInitPurchaseHandler();
        }
        this.props.initIngredientHandler();
    };

    // To make sure that we have added some ingredient to burger before pressing Order Now button
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((el) => {
                return ingredients[el];
            })
            .reduce((csum, el) => {
                return csum + el;
            }, 0);

        return sum > 0;
    };

    //To execute when we press the 'Order Now' button
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.props.setAuthRedirectPath('/');
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    // To execute when we press the 'continue' button on the Order Summary modal.
    continuePurchaseHandler = () => {
        this.props.onInitPurchaseHandler();
        this.props.history.push('/checkout');
    };

    // To execute when we press the 'cancel' button on the Order Summary modal.
    cancelPurchaseHandler = () => {
        this.props.history.goBack();
    };

    render() {
        //Used to disable the 'Less' button when the ingredient count is 0.
        let disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        //this.props.error is true when the axios cannot fetch the burger ingredients from firebase
        let burger = this.props.error ? (
            <h3>
                <center>Ingredients Can't be loaded!</center>
            </h3>
        ) : (
            <Spinner />
        );

        let orderSummary = null;

        //Set ingredients and Burger if the ingredients have been fetched.
        if (this.props.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.TotalPrice}
                    purchaseCanceled={this.cancelPurchaseHandler}
                    purchaseContinued={this.continuePurchaseHandler}
                />
            );

            burger = (
                <Auxilliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.props.TotalPrice}
                        purchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        login={this.login}
                    />
                </Auxilliary>
            );
        }

        return (
            <Auxilliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bgr.ingredients,
        TotalPrice: state.bgr.TotalPrice,
        error: state.bgr.error,
        isAuthenticated: state.auth.token !== null,
        purchased: state.odr.purchased
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (type) => dispatch(actions.addIngredient(type)),
        removeIngredientHandler: (type) =>
            dispatch(actions.removeIngredient(type)),
        initIngredientHandler: () => dispatch(actions.initIngredients()),
        onInitPurchaseHandler: () => dispatch(actions.purchaseInit()),
        setAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
