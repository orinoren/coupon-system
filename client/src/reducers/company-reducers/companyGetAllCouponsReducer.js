const initialState = {
  companyCoupons: [],
};

const companyGetAllCouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-ALL-COMPANY-COUPONS":
      return { ...state, companyCoupons: action.payload };
    case "RESET-COMPANY-COUPONS":
      return { ...state, companyCoupons: [] };
    default:
      return state;
  }
};
export default companyGetAllCouponsReducer;
