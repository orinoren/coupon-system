import authenticatedAxios from "../../service/AuthenticatedAxios";
import { converArrayToDate } from "../actions-for-guest/getAllCouponsAction";
const urlSuffix = "customer/coupons";
export const getAllCustomerCouponsAction = () => async (dispatch) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCustomerCoupons = res.data;
    console.log(allCustomerCoupons);
    for (let i = 0; i < allCustomerCoupons.length; i++) {
      const coupon = allCustomerCoupons[i];
      coupon.startDate = converArrayToDate(coupon.startDate);
      coupon.endDate = converArrayToDate(coupon.endDate);
      dispatch({
        type: "GET-ALL-CUSTOMER-COUPONS",
        payload: allCustomerCoupons,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
