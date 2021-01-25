import Auxilliary from "../../hoc/Auxilliary/Auxilliary";
import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from './../../store/actions';
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };
    
    componentDidMount = () => {
        // axios.get('https://react-burger-builder-3d148-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => (this.props.ingredients = response.data))
        //     .catch(error => (this.setState({error: true})));
    }

    // To make sure that we have added some ingredient to burger before pressing Order Now button
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((el) => {
            return ingredients[el];
        }).reduce((csum, el) => {
            return csum + el;
        },0);

        return sum>0;
    }

    //To execute when we press the 'Order Now' button
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    // To execute when we press the 'continue' button on the Order Summary modal. 
    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
    }

    // To execute when we press the 'cancel' button on the Order Summary modal. 
    cancelPurchaseHandler = () => {
        this.props.history.goBack();
    }

    render(){
        //Used to disable the 'Less' button when the ingredient count is 0.
        let disabledInfo = {
            ...this.props.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        //this.state.error is true when the axios cannot fetch the burger ingredients from firebase
        let burger = (this.state.error) ? <h3><center>Ingredients Can't be loaded!</center></h3> : <Spinner />;

        let orderSummary =  null;

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        //Set ingredients and Burger if the ingredients have been fetched.
        if(this.props.ingredients){
            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients}
            price={this.props.TotalPrice}
            purchaseCanceled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler} />;

            burger = (
                <Auxilliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded = {this.props.addIngredientHandler} 
                        ingredientRemoved = {this.props.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.props.TotalPrice}
                        purchasable = {this.updatePurchaseState(this.props.ingredients)}
                        ordered = {this.purchaseHandler}
                    />
                </Auxilliary>
            );
        }

        return(
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        TotalPrice: state.TotalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getIngredientHandler: () => dispatch({type: actionType.GET_INGREDIENTS}),
        addIngredientHandler: (type) => dispatch({type: actionType.ADD_INGREDIENTS, ingredientType: type}),
        removeIngredientHandler: (type) => dispatch({type: actionType.REMOVE_INGREDIENTS, ingredientType: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));