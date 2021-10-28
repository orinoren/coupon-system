const initialState = {
  customerCoupons: [],
};

const customerGetAllCouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-ALL-CUSTOMER-COUPONS":
      return { ...state, customerCoupons: action.payload };
    case "RESET-CUSTOMER-COUPONS":
      return { ...state, customerCoupons: [] };
    default:
      return state;
  }
};
export default customerGetAllCouponsReducer;
