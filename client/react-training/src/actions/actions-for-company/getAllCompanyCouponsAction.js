import authenticatedAxios from "../../service/AuthenticatedAxios";

const urlSuffix = "company/get-company-coupons";
export const getAllCompanyCouponsAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCompanyCoupons = res.data;

    const allCompanyCouponWithImages = [];
    for (let i = 0; i < allCompanyCoupons.length; i++) {
      for (let j = 0; j < allCompanyCoupons[i].length; j += 2) {
        const coupon = allCompanyCoupons[i][j];

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

        const couponImage = allCompanyCoupons[i][j + 1];
        allCompanyCouponWithImages.push({
          ...coupon,
          imageSrc: couponImage,
          startDate: startDateForCoupon,
          endDate: endDateForCoupon,
        });
      }
    }
    dispatch({
      type: "GET-ALL-COMPANY-COUPONS",
      payload: allCompanyCouponWithImages,
    });
  } catch (error) {}
};
