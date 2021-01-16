import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {Label: 'Salad', type: 'salad'},
    {Label: 'Meat', type: 'meat'},
    {Label: 'Cheese', type: 'cheese'},
    {Label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map((ig) => (
            <BuildControl 
                key={ig.Label} 
                label={ig.Label} 
                type={ig.type}
                ingredientAdded={props.ingredientAdded}
                ingredientRemoved={props.ingredientRemoved}
            />
        ))}
    </div>
);

export default buildControls;