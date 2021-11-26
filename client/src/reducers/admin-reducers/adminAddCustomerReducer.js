const initialState = {
  id: " ",
  first_name: " ",
  last_name: " ",
  email: " ",
  password: " ",
};

const adminAddCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-CUSTOMER":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default adminAddCustomerReducer;
