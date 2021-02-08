import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { Label: 'Salad', type: 'salad' },
    { Label: 'Meat', type: 'meat' },
    { Label: 'Cheese', type: 'cheese' },
    { Label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong>&#8377;{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((ig) => (
            <BuildControl
                key={ig.Label}
                label={ig.Label}
                type={ig.type}
                ingredientAdded={props.ingredientAdded}
                ingredientRemoved={props.ingredientRemoved}
                disabled={props.disabled[ig.type]}
            />
        ))}

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={() => props.ordered()}
        >
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER NOW'}
        </button>
    </div>
);

export default buildControls;
