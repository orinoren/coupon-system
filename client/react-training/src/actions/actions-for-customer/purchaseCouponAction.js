import authenticatedAxios from "../../service/AuthenticatedAxios";

const urlSuffix = "customer/purchase-coupon";
export const purchaseCouponAction =
  (couponsIdArr) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, couponsIdArr);
      dispatch({ type: "PURCHASE-COUPON", payload: res.data });
    } catch (error) {}
  };
