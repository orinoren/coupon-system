import React from "react";

import "./CouponCard.css";
import { useState, useEffect } from "react";
import defaultImage from "../../images/defaultImage.jpg";
import { companyDeleteCouponAction } from "../../actions/actions-for-company/deleteCouponAction";

import {
  companyResetSubmitCoupon,
  companyCouponResetAddModeAction,
  companyCouponUpdateModeAction,
} from "../../actions/actions-for-ui/action-for-ui";
import { useSelector, useDispatch } from "react-redux";
import CouponControllers from "./CouponControllers";

const CouponCard = (props) => {
  const dispatch = useDispatch();
  const [showAddToCartControlles, setShowAddToCartControlles] = useState(false);

  const [endDateView, setEndDateView] = useState(props.endDate);
  const [couponAddToCartAmount, setCouponAddToCartAmount] = useState(0);

  const companyCouponAddMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );
  const companyGlobalMode = useSelector(
    (state) => state.uiRootReducer.globalModeReducer.companyMode
  );

  const handleEditBtnClicked = () => {
    if (companyCouponAddMode) {
      dispatch(companyCouponResetAddModeAction());

      dispatch(companyCouponUpdateModeAction(props));
    } else {
      dispatch(companyCouponUpdateModeAction(props));
    }
  };
  const handleDeleteBtnClicked = () => {
    dispatch(companyDeleteCouponAction(props.coupon_id));
  };
  const hanldeAddToCartClicked = () => {
    if (showAddToCartControlles) {
      setShowAddToCartControlles(false);
    } else {
      setShowAddToCartControlles(true);
    }
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
                          {endDateView}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
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

                {companyGlobalMode ? (
                  <div>
                    <div className="d-flex mt-3 pt-2 border-top justify-content-between">
                      <div className="coupon-card-op-icon">
                        <span>
                          <i
                            onClick={() => handleEditBtnClicked()}
                            className="text-primary fs-3 fas fa-edit"
                          ></i>
                        </span>
                      </div>
                      <div className="coupon-card-op-icon">
                        <span>
                          <i
                            onClick={() => handleDeleteBtnClicked()}
                            className="text-danger fs-3 fas fa-trash-alt"
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={(e) => hanldeAddToCartClicked(e, props)}
                    className="btn-primary w-100 mt-2 text-center"
                  >
                    {showAddToCartControlles ? (
                      <CouponControllers
                        coupon={props}
                        controlAmount={couponAddToCartAmount}
                        setControlAmount={setCouponAddToCartAmount}
                      ></CouponControllers>
                    ) : (
                      <div>add to cart</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
