import authenticatedAxios from "../../service/AuthenticatedAxios";
import { convertArrayToDate } from "../actions-for-global/getAllCouponsAction";
const urlSuffix = "company/coupons";
export const getAllCompanyCouponsAction = () => async (dispatch) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCompanyCoupons = res.data;
    for (let i = 0; i < allCompanyCoupons.length; i++) {
      const coupon = allCompanyCoupons[i];
      coupon.startDate = convertArrayToDate(coupon.startDate);
      coupon.endDate = convertArrayToDate(coupon.endDate);
    }

    dispatch({
      type: "GET-ALL-COMPANY-COUPONS",
      payload: allCompanyCoupons,
    });
  } catch (error) {}
};
