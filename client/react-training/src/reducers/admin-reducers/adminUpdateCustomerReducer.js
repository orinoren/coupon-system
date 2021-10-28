const initialState = {
  id: " ",
  first_name: " ",
  last_name: " ",
  email: " ",
  password: " ",
};

const adminUpdateCustomerReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "UPDATE-CUSTOMER":
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default adminUpdateCustomerReducer;
