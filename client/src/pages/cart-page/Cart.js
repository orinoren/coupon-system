import React from "react";
import "./Cart.css";
import CartCouponContent from "../../componets/cart-components/CartCouponContent";
import CartSummery from "../../componets/cart-components/CartSummery";
import { useSelector, useDispatch } from "react-redux";
import { cartResetShowViewAction } from "../../actions/actions-for-ui/action-for-ui";
const Cart = (props) => {
  const cartNotificationAmount = useSelector(
    (state) => state.uiRootReducer.cartPropertisReducer.cartNotification
  );
  const dispatch = useDispatch();

  const handleExitCartButtonClicked = () => {
    dispatch(cartResetShowViewAction());
    dispatch({ type: "PURCHASE-COUPON-RESET-MSG" });
  };

  return (
    <>
      <div className="main-cart-bg">
        <div className="container-fluid p-0 p-lg-1">
          <div className="row pb-1 pb-md-5 cart-page-main-bg">
            <div className="col-12">
              <div className="container-fluid p-0 p-lg-1">
                <div className="row mt-5 cart-page-cart-bg">
                  <div className="col-12">
                    <div className="h2">
                      You have {cartNotificationAmount} items
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-11 h3">
                      {cartNotificationAmount === 0
                        ? "Cart Empty"
                        : "Your cart"}
                    </div>
                    <div className="col-1">
                      <i
                        onClick={() => handleExitCartButtonClicked()}
                        className=" far fs-2 text-success fa-times-circle"
                      ></i>
                    </div>
                  </div>
                  <div className="row p-0 p-md-1 m-0 ml-lg-1">
                    <div className="col-12 p-0 p-lg-1 col-md-7">
                      <div className="container-fluid p-0 p-lg-1 ">
                        {props.cartCouponList?.map((coupon, index) => {
                          return (
                            <div
                              key={index}
                              className="row m-0 border cart-bg m-md-1"
                            >
                              <div className="col-12">
                                <CartCouponContent
                                  title={coupon.title}
                                  price={coupon.price}
                                  amount={coupon.amount}
                                  description={coupon.description}
                                  endDate={coupon.endDate}
                                  image={coupon.image}
                                  couponInCartAmount={coupon.couponCartAmount}
                                ></CartCouponContent>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-12 col-md-5">
                      <div className="container-fluid">
                        <div className="row">
                          <CartSummery></CartSummery>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
