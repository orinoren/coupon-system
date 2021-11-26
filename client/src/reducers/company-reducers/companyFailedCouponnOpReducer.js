const initialState = {
  failed: false,
  messege: "",
};

const companyFailedCouponnOpReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "COUPON-OP-FAILED":
      return { ...state, failed: true, messege: payload };
    case "RESET-COUPON-OP-FAILED":
      return { ...state, failed: false, messege: "" };

    default:
      return state;
  }
};
export default companyFailedCouponnOpReducer;
