const initialState = {
  customerId: 0,
};

const adminDeleteCustomerReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "DELETE-CUSTOMER":
      return { ...state, customerId: payload };

    default:
      return state;
  }
};
export default adminDeleteCustomerReducer;
