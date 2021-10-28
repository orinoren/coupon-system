const initialState = {
  coupon_id: "",
  title: "",
  category_id: "",
  description: "",
  startDate: "",
  endDate: "",
  amount: "",
  price: "",
  image: " ",
};

const companyUpdateCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE-COUPON":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default companyUpdateCouponReducer;
