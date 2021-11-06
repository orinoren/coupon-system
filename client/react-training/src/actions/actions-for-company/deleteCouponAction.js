import authenticatedAxios from "../../service/AuthenticatedAxios";
const urlSuffix = "company/delete-coupon";
export const companyDeleteCouponAction =
  (coupon_id) => async (dispatch, getState) => {
    console.log(coupon_id);
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, {
          params: { id: coupon_id },
        });

      if (res.status === 200) {
        dispatch({ type: "DELETE-COUPON", payload: coupon_id });
      }
    } catch (error) {}
  };
