import authenticatedAxios from "../../service/AuthenticatedAxios";
import { converArrayToDate } from "../actions-for-guest/getAllCouponsAction";
const urlSuffix = "company/coupons";
export const getAllCompanyCouponsAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCompanyCoupons = res.data;
    console.log(allCompanyCoupons);
    for (let i = 0; i < allCompanyCoupons.length; i++) {
      const coupon = allCompanyCoupons[i];
      console.log(coupon.startDate);
      console.log(coupon.endDate);
      coupon.startDate = converArrayToDate(coupon.startDate);
      coupon.endDate = converArrayToDate(coupon.endDate);
      console.log(coupon.startDate);
      console.log(coupon.endDate);
    }
    dispatch({
      type: "GET-ALL-COMPANY-COUPONS",
      payload: allCompanyCoupons,
    });
  } catch (error) {}
};
