const initialState = {
  coupon_id: "",
};

const companyDeleteCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE-COUPON":
      return { ...state, coupon_id: action.payload };

    default:
      return state;
  }
};
export default companyDeleteCouponReducer;
