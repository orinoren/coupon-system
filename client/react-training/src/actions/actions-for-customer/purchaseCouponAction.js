import authenticatedAxios from "../../service/AuthenticatedAxios";

const urlSuffix = "customer/purchase-coupon";
export const purchaseCouponAction =
  (couponsIdArr) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, couponsIdArr);
      if (res.status === 200) {
        dispatch({ type: "PURCHASE-COUPON-SUCCEED" });
      }
    } catch (error) {
      dispatch({ type: "PURCHASE-COUPON-FAILED" });
    }
  };
