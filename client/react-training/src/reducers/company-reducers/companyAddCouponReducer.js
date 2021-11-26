const initialState = {
  title: "",
  category: "",
  description: "",
  startDate: "",
  endDate: "",
  amount: "",
  price: "",
  image: " ",
};

const companyAddCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-COUPON":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default companyAddCouponReducer;
