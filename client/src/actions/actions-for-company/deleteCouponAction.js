import authenticatedAxios from "../../service/AuthenticatedAxios";
const urlSuffix = "company/coupon";
export const companyDeleteCouponAction = (couponId) => async (dispatch) => {
  try {
    const res = await authenticatedAxios
      .getAuthenticatedAxios()
      .delete(urlSuffix, {
        params: { id: couponId },
      });

    if (res.status === 200) {
      dispatch({ type: "DELETE-COUPON", payload: couponId });
    }
  } catch (error) {}
};
