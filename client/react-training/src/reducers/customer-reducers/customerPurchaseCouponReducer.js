const initialState = [];
const purchaseCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PURCHASE-COUPON":
      return state;

    default:
      return state;
  }
};

export default purchaseCouponReducer;
