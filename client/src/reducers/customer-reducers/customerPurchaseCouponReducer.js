const initialState = {
  purchaseFailed: false,
  purchaseSucceed: false,
};
const purchaseCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PURCHASE-COUPON-SUCCEED":
      return { ...state, purchaseFailed: false, purchaseSucceed: true };

    case "PURCHASE-COUPON-FAILED":
      return { ...state, purchaseFailed: true, purchaseSucceed: false };
    case "PURCHASE-COUPON-RESET-MSG":
      return { ...state, purchaseFailed: false, purchaseSucceed: false };

    default:
      return state;
  }
};

export default purchaseCouponReducer;
