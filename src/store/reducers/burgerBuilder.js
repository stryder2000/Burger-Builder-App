import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
};

const initialState = {
    ingredients: null,
    TotalPrice: 4,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                error: false,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.bacon,
                    meat: action.ingredients.meat
                },
                TotalPrice: 4,
                building: false
            };
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return updateObject(state, { error: true });
        }
        case actionTypes.ADD_INGREDIENTS: {
            const updatedIngredient = {
                [action.ingredientType]:
                    state.ingredients[action.ingredientType] + 1
            };
            const updatedIngredients = updateObject(
                state.ingredients,
                updatedIngredient
            );
            const updatedState = {
                ingredients: updatedIngredients,
                TotalPrice:
                    state.TotalPrice + INGREDIENTS_PRICE[action.ingredientType],
                building: true
            };
            return updateObject(state, updatedState);
        }
        case actionTypes.REMOVE_INGREDIENTS: {
            const updatedIngredient = {
                [action.ingredientType]:
                    state.ingredients[action.ingredientType] - 1
            };
            const updatedIngredients = updateObject(
                state.ingredients,
                updatedIngredient
            );
            const updatedState = {
                ingredients: updatedIngredients,
                TotalPrice:
                    state.TotalPrice - INGREDIENTS_PRICE[action.ingredientType],
                building: true
            };
            return updateObject(state, updatedState);
        }
        default:
            return state;
    }
};

export default reducer;
