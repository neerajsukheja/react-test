const initialState = {
  ingredients: {
    onion: 0,
    potato: 0,
    tomato: 0,
  },
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      const newIngredientsAdd = state.ingredients;
      newIngredientsAdd[action.value] = state.ingredients[action.value] + 1;
      return {
        ingredients: newIngredientsAdd,
        total: state.total + 1,
      };
    case "REMOVE_INGREDIENT":
      const newIngredientsDelete = state.ingredients;
      newIngredientsDelete[action.value] = state.ingredients[action.value] - 1;
      return {
        ingredients: newIngredientsDelete,
        total: state.total - 1,
      };
    default:
      return state;
  }
};

export default reducer;
