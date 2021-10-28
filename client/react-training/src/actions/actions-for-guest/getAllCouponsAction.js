import axios from "axios";
const url = "http://localhost:8081/universal/get-all-coupons";

export const getAllCouponsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(url);

    const allCoupons = res.data;

    const allCouponWithImages = [];
    for (let i = 0; i < allCoupons.length; i++) {
      for (let j = 0; j < allCoupons[i].length; j += 2) {
        const coupon = allCoupons[i][j];

        let startDate = new Date(...coupon.startDate);

        let startDateForCoupon =
          startDate.getFullYear() +
          "-" +
          ("0" + (startDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + startDate.getDate()).slice(-2);
        let endDate = new Date(...coupon.endDate);

        let endDateForCoupon =
          endDate.getFullYear() +
          "-" +
          ("0" + (endDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + endDate.getDate()).slice(-2);

        const couponImage = allCoupons[i][j + 1];
        allCouponWithImages.push({
          ...coupon,
          imageSrc: couponImage,
          startDate: startDateForCoupon,
          endDate: endDateForCoupon,
        });
      }
    }

    dispatch({
      type: "GET-ALL-COUPONS",
      payload: allCouponWithImages,
    });
  } catch (error) {}
};
