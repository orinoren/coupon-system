import authenticatedAxios from "../../service/AuthenticatedAxios";

const urlSuffix = "company/add-coupon";
export const companyAddCouponAction =
  (couponObj) => async (dispatch, getState) => {
    try {
      const formData = new FormData();
      formData.append("file", couponObj.image);

      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, formData, {
          params: { coupon: { ...couponObj, couponImage: "" } },
        });
      dispatch({ type: "ADD-COUPON", payload: res.data });
    } catch (error) {
      dispatch({ type: "COUPON-OP-FAILED", payload: error.response.data });
    }
  };
