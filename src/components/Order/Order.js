import React from 'react';
import classes from './Order.css';
import Button from './../UI/Button/Button';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map((ig) => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 5px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >
                {ig.name} ({ig.amount}){' '}
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>

            <p>
                Price: <strong> &#8377; {props.price}</strong>
            </p>
            <div style={{ marginLeft: '85%' }}>
                <Button
                    BtnType="Danger"
                    clicked={() =>
                        props.deleteOrderHandler(props.token, props.orderId)
                    }
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default order;
