const initialState = {
  allCouponsImages: [],
};

const getAllCouponsImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-ALL-COUPONS-IMAGES":
      return { ...state, allCouponsImages: action.payload };

    default:
      return state;
  }
};
export default getAllCouponsImagesReducer;
