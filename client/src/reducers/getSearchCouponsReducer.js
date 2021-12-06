const searchResultCouponList = {
  couponList: [],
};

const getSearchResultCouponsReducer = (
  state = searchResultCouponList,
  action
) => {
  switch (action.type) {
    case "SEARCH-RESULT-COUPON-LIST":
      return {
        ...state,
        couponList: action.payload,
      };
    case "RESET-SEARCH-RESULT-COUPON-LIST":
      return {
        ...state,
        couponList: [],
      };
    default:
      return state;
  }
};
export default getSearchResultCouponsReducer;
