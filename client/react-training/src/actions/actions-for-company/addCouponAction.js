import authenticatedAxios from "../../service/AuthenticatedAxios";
import { companySumbitCoupon } from "../actions-for-ui/action-for-ui";
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
      if (res.status === "201") {
        dispatch({ type: "ADD-COUPON", payload: res.data });
        dispatch(companySumbitCoupon());
      }
    } catch (error) {
      dispatch({ type: "COUPON-OP-FAILED", payload: error.response.data });
      dispatch(companySumbitCoupon());
    }
  };
