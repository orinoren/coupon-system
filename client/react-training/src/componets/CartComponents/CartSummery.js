import React from "react";
import "../../pages/CartPage/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { purchaseCouponAction } from "../../actions/actions-for-customer/purchaseCouponAction";
import { useHistory } from "react-router";
import {
  resetCartAction,
  resetCartNotificationAction,
  resetUserModeAction,
} from "../../actions/actions-for-ui/action-for-ui";
const CartSummery = () => {
  const cartSummery = useSelector(
    (state) => state.uiRootReducer.cartPropertisReducer.cartSummery
  );
  const couponPurchaseDetails = useSelector(
    (state) => state.customerRootReducer.purchaseCouponReducer
  );
  const couponsToPurchase = useSelector(
    (state) => state.uiRootReducer.cartArrReducer
  );
  const loginDetails = useSelector((state) => state.authReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const handlePurchaseBtnClicked = () => {
    if (!loginDetails.isLogged) {
      history.push("/login");
      dispatch(resetUserModeAction());
    } else {
      const couponsIdArr = [];
      for (let i = 0; i < couponsToPurchase.length; i++) {
        const coupon = couponsToPurchase[i];
        for (let j = 0; j < coupon.couponCartAmount; j++) {
          couponsIdArr.push(coupon.coupon_id);
        }
      }
      dispatch(purchaseCouponAction(couponsIdArr));
      dispatch(resetCartAction());
      dispatch(resetCartNotificationAction());
    }
  };
  return (
    <div>
      <div className="mt-2 mt-lg-0 col-12 col-lg-8 ">
        <div className="conatiner ">
          <div className="row ">
            <div className="col-12  ">
              <div className="card mb-3 ">
                <div className="card-header card-title text-success bg-transparent ">
                  Cart summery
                </div>
                <div className="card-body ">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">Total price </h5>
                    <h5 className="card-title text-end">
                      {cartSummery.toLocaleString()}{" "}
                      <span className="text-success b">$</span>
                    </h5>
                  </div>
                </div>
                <div className="card-footer text-end bg-transparent ">
                  <div
                    onClick={() => handlePurchaseBtnClicked()}
                    className="btn-primary purchase-btn text-center"
                  >
                    Purcahse
                  </div>
                </div>
                {couponPurchaseDetails.purchaseSucceed ? (
                  <span className="text-success fw-bold text-center">
                    Purchase made succesfully
                  </span>
                ) : couponPurchaseDetails.purchaseFailed ? (
                  <span className="text-success fw-bold text-center">
                    Purchase failed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummery;
