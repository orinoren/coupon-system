const initialState = {
  allCoupons: [],
};

const getAllCouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-ALL-COUPONS":
      return { ...state, allCoupons: action.payload };

    default:
      return state;
  }
};
export default getAllCouponsReducer;
