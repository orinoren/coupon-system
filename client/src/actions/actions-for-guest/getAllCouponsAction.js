import axios from "axios";
const url = "http://localhost:8081/global/coupons";

export const getAllCouponsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(url);
    const allCoupons = res.data;

    for (let i = 0; i < allCoupons.length; i++) {
      const coupon = allCoupons[i];
      coupon.startDate = converArrayToDate(coupon.startDate);
      coupon.endDate = converArrayToDate(coupon.endDate);
    }

    console.log(allCoupons);
    dispatch({
      type: "GET-ALL-COUPONS",
      payload: allCoupons,
    });
  } catch (error) {
    console.log("ERRE");
  }
};
export const converArrayToDate = (array) => {
  let date = new Date(array);
  const dateForCoupon =
    date.getFullYear() +
    "-" +
    ("0" + (1 + date.getMonth())).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  return dateForCoupon;
};
