const initiatlState = {
  allCustomers: [],
};
const adminGetAllCustomersReducer = (state = initiatlState, action) => {
  switch (action.type) {
    case "GET-ALL-CUSTOMERS":
      return { ...state, allCustomers: action.payload };
    default:
      return state;
  }
};
export default adminGetAllCustomersReducer;
