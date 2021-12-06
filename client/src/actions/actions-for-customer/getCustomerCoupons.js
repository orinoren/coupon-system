import authenticatedAxios from "../../service/AuthenticatedAxios";
import { convertArrayToDate } from "../actions-for-global/getAllCouponsAction";
const urlSuffix = "customer/coupons";
export const getAllCustomerCouponsAction = () => async (dispatch) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCustomerCoupons = res.data;
    for (let i = 0; i < allCustomerCoupons.length; i++) {
      const coupon = allCustomerCoupons[i];
      coupon.startDate = convertArrayToDate(coupon.startDate);
      coupon.endDate = convertArrayToDate(coupon.endDate);
      dispatch({
        type: "GET-ALL-CUSTOMER-COUPONS",
        payload: allCustomerCoupons,
      });
    }
  } catch (error) {}
};
