import Auxilliary from "../../hoc/Auxilliary/Auxilliary";
import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        TotalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    
    componentDidMount = () => {
        axios.get('https://react-burger-builder-3d148-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => this.setState({error: true}));
    }

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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.TotalPrice,
            customer: {
                name: 'Siddharth',
                address: {
                    Street: 'Teststreet 1',
                    zipCode: '345312',
                    country: 'India' 
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
        .then((response) => {this.setState({loading: false, purchasing: false})})
        .catch((error) => {this.setState({loading: false, purchasing: false})});
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

        let burger = (this.state.error) ? <h3><center>Ingredients Can't be loaded!</center></h3> : <Spinner />;
        let orderSummary =  null;

        if(this.state.ingredients){
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.TotalPrice}
            purchaseCanceled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler} />;

            if(this.state.loading){
                orderSummary = <Spinner />
            }

            burger = (
                <Auxilliary>
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

export default withErrorHandler(BurgerBuilder,axios);