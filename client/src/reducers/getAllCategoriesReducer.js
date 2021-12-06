const initialState = {
  allCategories: [],
};

const getAllCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-ALL-CATEGORIES":
      return {
        ...state,
        allCategories: action.payload,
      };
    default:
      return state;
  }
};

export default getAllCategoriesReducer;
