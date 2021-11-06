import authenticatedAxios from "../../service/AuthenticatedAxios";
import { companySubmitCoupon } from "../actions-for-ui/action-for-ui";
const urlSuffix = "company/update-coupon";

export const companyUpdateCouponAction =
  (couponObj) => async (dispatch, getState) => {
    try {
      if (couponObj.image instanceof File) {
        const formData = new FormData();
        formData.append("file", couponObj.image);
        try {
          const respo = await authenticatedAxios
            .getAuthenticatedAxios()
            .put(urlSuffix, formData, {
              params: { coupon: { ...couponObj, image: "" } },
            });
          if (respo.status === 200) {
            dispatch({ type: "UPDATE-COUPON", payload: respo.data });
            dispatch(companySubmitCoupon());
          }
        } catch (error) {
          dispatch({
            type: "COUPON-OP-FAILED",
            payload: error.response.data,
          });
          dispatch(companySubmitCoupon());
        }
      } else {
        try {
          const respo = await authenticatedAxios
            .getAuthenticatedAxios()
            .put(urlSuffix, null, {
              params: { coupon: { ...couponObj, image: "" } },
            });
          if (respo.status === 200) {
            dispatch({ type: "UPDATE-COUPON", payload: respo.data });
            dispatch(companySubmitCoupon());
          }
        } catch (error) {
          dispatch({ type: "COUPON-OP-FAILED", payload: error.response.data });
          dispatch(companySubmitCoupon());
        }
      }
    } catch (error) {}
  };
