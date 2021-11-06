import React from "react";
import "../../pages/cart-page/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { resetUserModeAction } from "../../actions/actions-for-ui/action-for-ui";
import {
  getPurchaseMsgFunc,
  handlePurchaseBtnClickedFunc,
} from "./utils/CartFunctions";

const CartSummery = () => {
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
  const userDetails = useSelector((state) => state.authReducer);

  const handlePurchaseBtnClicked = () => {
    if (userDetails.isLogged) {
      handlePurchaseBtnClickedFunc(couponsToPurchase, dispatch);
      return;
    }
    history.push("/login");
    dispatch(resetUserModeAction());
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
