import React, { useState } from "react";
import "../../pages/cart-page/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { resetUserModeAction } from "../../actions/actions-for-ui/action-for-ui";
import {
  getPurchaseMsgFunc,
  handlePurchaseBtnClickedFunc,
} from "./utils/CartFunctions";

const CartSummery = () => {
  const [showAlreadyPurchaseCouponMsg, setShowAlreadyPurchaseCouponMsg] =
    useState({ couponPurchaseFoundTitle: "", couponPurchaseFound: false });
  const history = useHistory();
  const dispatch = useDispatch();

  const cartSummery = useSelector(
    (state) => state.uiRootReducer.cartPropertisReducer.cartSummery
  );
  const couponPurchaseDetails = useSelector(
    (state) => state.customerRootReducer.purchaseCouponReducer
  );
  const couponsToPurchase = useSelector(
    (state) => state.uiRootReducer.cartArrReducer
  );
  const customerCoupons = useSelector(
    (state) =>
      state.customerRootReducer.customerGetAllCouponsReducer.customerCoupons
  );
  const userDetails = useSelector((state) => state.authReducer);

  const handlePurchaseBtnClicked = () => {
    if (userDetails.isLogged) {
      let notPurchased = true;
      let couponPurchaseFoundTitleMsg = "";
      for (let i = 0; i < customerCoupons.length && notPurchased; i++) {
        const coupon = customerCoupons[i];
        for (let j = 0; j < couponsToPurchase.length && notPurchased; j++) {
          const couponToPurchase = couponsToPurchase[j];
          if (coupon.id === couponToPurchase.id) {
            notPurchased = false;
            couponPurchaseFoundTitleMsg = couponToPurchase.title;
          }
        }
      }
      if (notPurchased) {
        handlePurchaseBtnClickedFunc(couponsToPurchase, dispatch);
        return;
      }
      setShowAlreadyPurchaseCouponMsg({
        couponPurchaseFoundTitle: couponPurchaseFoundTitleMsg,
        couponPurchaseFound: true,
      });
      return;
    }
    history.push("/login");
    dispatch(resetUserModeAction());
  };

  const handleYesClicked = () => {
    setShowAlreadyPurchaseCouponMsg({
      couponPurchaseFoundTitle: "",
      couponPurchaseFound: false,
    });
    handlePurchaseBtnClickedFunc(couponsToPurchase, dispatch);
  };

  const handleNoClicked = () => {
    setShowAlreadyPurchaseCouponMsg({
      couponPurchaseFoundTitle: "",
      couponPurchaseFound: false,
    });
  };
  const getPurchaseMsg = () => getPurchaseMsgFunc(couponPurchaseDetails);
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
                      {cartSummery.toLocaleString()}
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
                  {showAlreadyPurchaseCouponMsg.couponPurchaseFound ? (
                    <div className="text-start fw-bold ">
                      You already purchase{" "}
                      <span className="text-danger">
                        {showAlreadyPurchaseCouponMsg.couponPurchaseFoundTitle}{" "}
                      </span>
                      coupon are you sure you want you purchase?{" "}
                      <span
                        onClick={() => handleYesClicked()}
                        className="border mx-1 px-2 already-purchased-msg-choice-yes "
                      >
                        Yes
                      </span>
                      <span
                        onClick={() => handleNoClicked()}
                        className="px-2 border already-purchased-msg-choice-no "
                      >
                        No
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {getPurchaseMsg()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummery;
