import Auxilliary from "../../hoc/Auxilliary";
import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
        TotalPrice: 4 
    };

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
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = (oldCount > 0) ? oldCount - 1 : 0;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.TotalPrice;
        const priceChange = (oldCount !== newCount) ? INGREDIENTS_PRICE[type] : 0;
        const newPrice = oldPrice - priceChange;
        this.setState({ingredients: updatedIngredients, TotalPrice: newPrice});
    }

    render(){
        return(
            <Auxilliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                />
            </Auxilliary>
        )
    }
}

export default BurgerBuilder;