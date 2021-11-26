const initialState = {
  id: "",
};

const companyDeleteCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE-COUPON":
      return { ...state, id: action.payload };

    default:
      return state;
  }
};
export default companyDeleteCouponReducer;
