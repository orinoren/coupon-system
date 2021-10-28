import authenticatedAxios from "../../service/AuthenticatedAxios";

const urlSuffix = "customer/get-customer-coupons";
export const getAllCustomerCouponsAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    const allCustomerCoupons = res.data;

    const allCustomerCouponsWithImages = [];
    for (let i = 0; i < allCustomerCoupons.length; i++) {
      for (let j = 0; j < allCustomerCoupons[i].length; j += 2) {
        const coupon = allCustomerCoupons[i][j];

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

        const couponImage = allCustomerCoupons[i][j + 1];
        allCustomerCouponsWithImages.push({
          ...coupon,
          imageSrc: couponImage,
          startDate: startDateForCoupon,
          endDate: endDateForCoupon,
        });
      }
    }
    allCustomerCouponsWithImages.sort(
      (couponA, couponB) => couponA.coupon_id - couponB.coupon_id
    );
    dispatch({
      type: "GET-ALL-CUSTOMER-COUPONS",
      payload: allCustomerCouponsWithImages,
    });
  } catch (error) {}
};
