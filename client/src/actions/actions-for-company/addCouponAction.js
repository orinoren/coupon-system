import authenticatedAxios from "../../service/AuthenticatedAxios";
import { companySubmitCoupon } from "../actions-for-ui/action-for-ui";
const urlSuffix = "company/coupon";
export const companyAddCouponAction =
  (couponObj, image) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, formData, {
          params: { coupon: { ...couponObj } },
        });
      if (res.status === 201) {
        dispatch({ type: "ADD-COUPON", payload: res.data });
        dispatch(companySubmitCoupon());
      }
    } catch (error) {
      dispatch({
        type: "COUPON-OP-FAILED",
        payload: error.response.data.messege,
      });
      dispatch(companySubmitCoupon());
    }
  };
