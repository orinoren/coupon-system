import authenticatedAxios from "../../service/AuthenticatedAxios";
const urlSuffix = "company/coupon";
export const companyDeleteCouponAction = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    const res = await authenticatedAxios
      .getAuthenticatedAxios()
      .delete(urlSuffix, {
        params: { id: id },
      });

    if (res.status === 200) {
      dispatch({ type: "DELETE-COUPON", payload: id });
    }
  } catch (error) {}
};
