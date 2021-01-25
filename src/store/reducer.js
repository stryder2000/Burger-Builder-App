import * as actionType from './actions';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    TotalPrice: 4
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        // case actionType.GET_INGREDIENTS: {
            // let ingredients = null;
            // axios.get('/ingredients.json')
            // .then(response => {
            //     ingredients = response.data;
            //     console.log(state.ingredients, state.TotalPrice);
            // })
            // .catch(error => (action.error = true));
            // return {
            //     ...state,
            //     ingredients: ingredients
            // }
        // }
        case actionType.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                TotalPrice: state.TotalPrice + INGREDIENTS_PRICE[action.ingredientType]
            }
        }
        case actionType.REMOVE_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType] : state.ingredients[action.ingredientType] - 1
                },
                TotalPrice: state.TotalPrice - INGREDIENTS_PRICE[action.ingredientType]
            }
        }
        default: 
        return state;
    }
};

export default reducer;