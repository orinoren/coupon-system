import React from "react";
import "../CouponCard.css";
import { useState, useEffect } from "react";
import defaultImage from "../../../images/defaultImage.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getCouponCardFotterFunc } from "./utils/CouponCardFunctions";
const CouponCard = (props) => {
  const dispatch = useDispatch();
  const [showAddToCartControlles, setShowAddToCartControlles] = useState(false);

  const [couponAddToCartAmount, setCouponAddToCartAmount] = useState(0);

  const couponPurchaseDetails = useSelector(
    (state) => state.customerRootReducer.purchaseCouponReducer
  );
  const companyCouponAddMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );

  const userDetails = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (couponPurchaseDetails.purchaseSucceed) {
      setShowAddToCartControlles(false);
      setCouponAddToCartAmount(0);
    }
    return () => {};
  }, [couponPurchaseDetails]);

  const getCouponCardFotter = () => {
    return getCouponCardFotterFunc(
      userDetails.role,
      props,
      companyCouponAddMode,
      showAddToCartControlles,
      setShowAddToCartControlles,
      couponAddToCartAmount,
      setCouponAddToCartAmount,
      dispatch
    );
  };
  return (
    <div className="container mb-2 coupon-card-conatiner-border p-1 ">
      <div className="row">
        <div className="col-12 h-100">
          <div className="coupon-card-margin-top">
            <div className="card coupon-card-border w-100">
              <img
                src={
                  props.image === undefined
                    ? defaultImage
                    : "data:image/*;base64," + props.image
                }
                id="coupon-image"
                className="card-img-top coupoun-card-img-size"
                alt="..."
              />
              <div className="card-body mt-2 p-0">
                <h5 className="card-title  coupon-card-title-text-font ">
                  {props.title}
                </h5>
                <div className="d-flex justify-content-between">
                  <div className="coupon-card-p-text-font ">
                    {`Ends at : `}
                    <div>
                      <div>
                        <span className=" fw-bold  fs-6 text-primary">
                          {props.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex mt-1 justify-content-between">
                    <div className="coupon-card-p-text-font fs-6 fw-bolder text-success">
                      {props.price}
                      {" $"}
                    </div>
                    <div className="coupon-card-p-text-font fs-6">
                      {`remain : `}
                      <span className="fw-bolder text-danger">
                        {props.amount}
                      </span>
                    </div>
                  </div>
                </div>
                {getCouponCardFotter()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
