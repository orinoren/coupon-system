import authenticatedAxios from "../../service/AuthenticatedAxios";
import { companySubmitCoupon } from "../actions-for-ui/action-for-ui";
const urlSuffix = "company/coupon";

export const companyUpdateCouponAction =
  (couponObj, image) => async (dispatch, getState) => {
    try {
      if (image instanceof File) {
        const formData = new FormData();
        formData.append("file", image);
        try {
          const respo = await authenticatedAxios
            .getAuthenticatedAxios()
            .put(urlSuffix, formData, {
              params: { coupon: { ...couponObj } },
            });
          if (respo.status === 200) {
            dispatch({ type: "UPDATE-COUPON", payload: respo.data });
            dispatch(companySubmitCoupon());
          }
        } catch (error) {
          dispatch({
            type: "COUPON-OP-FAILED",
            payload: error.response.data.messege,
          });
          dispatch(companySubmitCoupon());
        }
      } else {
        try {
          const respo = await authenticatedAxios
            .getAuthenticatedAxios()
            .put(urlSuffix, null, {
              params: { coupon: { ...couponObj } },
            });
          if (respo.status === 200) {
            dispatch({ type: "UPDATE-COUPON", payload: respo.data });
            dispatch(companySubmitCoupon());
          }
        } catch (error) {
          dispatch({
            type: "COUPON-OP-FAILED",
            payload: error.response.data.messege,
          });
          dispatch(companySubmitCoupon());
        }
      }
    } catch (error) {}
  };
