import Auxilliary from "../../hoc/Auxilliary/Auxilliary";
import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad : 0,
            cheese : 0,
            bacon : 0,
            meat : 0
        },
        TotalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((el) => {
            return ingredients[el];
        }).reduce((csum, el) => {
            return csum + el;
        },0);

        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.TotalPrice;
        const priceAddition = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, TotalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.TotalPrice;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, TotalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    continuePurchaseHandler = () => {
        alert('You Continue!');
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    render(){
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.TotalPrice}
                        purchaseCanceled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.TotalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                />
            </Auxilliary>
        )
    }
}

export default BurgerBuilder;