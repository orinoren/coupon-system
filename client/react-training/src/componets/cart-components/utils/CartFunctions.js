import {
  purchaseCouponAction,
  resetCartAction,
  resetCartNotificationAction,
} from "../../../actions/actions-for-customer/purchaseCouponAction";
export const handlePurchaseBtnClickedFunc = (couponsToPurchase, dispatch) => {
  const couponsIdArr = [];
  for (let i = 0; i < couponsToPurchase.length; i++) {
    for (let j = 0; j < couponsToPurchase[i].couponCartAmount; j++) {
      couponsIdArr.push(couponsToPurchase[i].coupon_id);
    }
  }
  dispatch(purchaseCouponAction(couponsIdArr));
  dispatch(resetCartAction());
  dispatch(resetCartNotificationAction());
};
export const getPurchaseMsgFunc = (couponPurchaseDetails) => {
  if (couponPurchaseDetails.purchaseSucceed) {
    return (
      <span className="text-success fw-bold text-center">
        Purchase made succesfully
      </span>
    );
  }
  if (couponPurchaseDetails.purchaseFailed) {
    return (
      <span className="text-success fw-bold text-center">Purchase failed</span>
    );
  }
  return "";
};
