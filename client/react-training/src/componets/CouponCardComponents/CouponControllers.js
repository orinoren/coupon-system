import React from "react";
import {
  incrementCartNotificationAction,
  decrementCartNotificationAction,
  removeFromCartAction,
  addToCartAction,
} from "../../actions/actions-for-ui/action-for-ui";

import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

const CouponControllers = (props) => {
  const dispatch = useDispatch();

  const [couponAddToCartAmount, setCouponAddToCartAmount] = useState(
    props.controlAmount
  );
  const [addOrRemoveClicked, setAddOrRemoveClicked] = useState({
    add: false,
    remove: false,
  });
  const handleIncrementCouponToCartClicked = (e) => {
    e.stopPropagation();
    if (couponAddToCartAmount < props.coupon.amount) {
      props.setControlAmount(couponAddToCartAmount + 1);
      setCouponAddToCartAmount(couponAddToCartAmount + 1);
      dispatch(incrementCartNotificationAction(props.coupon.price));
      setAddOrRemoveClicked({
        ...addOrRemoveClicked,
        add: true,
        remove: false,
      });
    }
  };
  const handleDecrementCouponToCartClicked = (e) => {
    e.stopPropagation();
    if (couponAddToCartAmount !== 0) {
      props.setControlAmount(couponAddToCartAmount - 1);
      setCouponAddToCartAmount(couponAddToCartAmount - 1);
      dispatch(decrementCartNotificationAction(props.coupon.price));
      setAddOrRemoveClicked({
        ...addOrRemoveClicked,
        add: false,
        remove: true,
      });
    }
  };
  useEffect(() => {
    if (addOrRemoveClicked.add) {
      dispatch(
        addToCartAction({
          ...props.coupon,
          couponCartAmount: props.controlAmount,
        })
      );
    } else if (addOrRemoveClicked.remove) {
      dispatch(
        removeFromCartAction({
          ...props.coupon,
          couponCartAmount: props.controlAmount,
        })
      );
    }
    return () => {};
  }, [props.controlAmount, addOrRemoveClicked, dispatch]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <span>close</span>
          </div>
          <div className="p-0 col-2">
            <span onClick={(e) => handleDecrementCouponToCartClicked(e)}>
              <div className="coupon-card-controller-text">-</div>
            </span>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="p-0 col-2">
            <span>{couponAddToCartAmount}</span>
          </div>
          <div className="p-0 col-2">
            <span onClick={(e) => handleIncrementCouponToCartClicked(e)}>
              <div className="coupon-card-controller-text">+</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponControllers;
