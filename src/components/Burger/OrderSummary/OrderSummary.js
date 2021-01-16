import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>
                : {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Auxilliary>
            <h3>Your Order: </h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <span style={{textAlign: 'center'}}><p><strong>Total Price: ${props.price.toFixed(2)}</strong></p></span>
            <p>Continue to Checkout?</p>
            <Button BtnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button BtnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Auxilliary>
    );
};

export default orderSummary;