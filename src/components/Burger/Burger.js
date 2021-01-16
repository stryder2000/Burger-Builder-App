import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let TransformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredients key={igKey+i} type={igKey} />;
        });
    })
    .reduce((arr,el) => arr.concat(el), []);

    if(TransformedIngredients.length === 0){
        TransformedIngredients = <p>Please start adding Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {TransformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;