import React from "react";

import "./CompanyOperations.css";
import { useEffect } from "react";
import { companyAddCouponAction } from "../../actions/actions-for-company/addCouponAction";
import { useDispatch, useSelector } from "react-redux";
import {
  companySumbitCoupon,
  companyResetSubmitCoupon,
} from "../../actions/actions-for-ui/action-for-ui";
import { companyUpdateCouponAction } from "../../actions/actions-for-company/updateCouponAction";
const CompanyOperationsCouponView = (props) => {
  const dispatch = useDispatch();

  const submitMsgView = useSelector(
    (state) =>
      state.uiRootReducer.companySubmitCouponReducer.companySubmitCoupon
  );
  const errorMsg = useSelector(
    (state) => state.companyRootReducer.companyFailedCouponnOpReducer
  );
  const addMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );
  const updateMode = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.updateMode
  );

  useEffect(() => {
    dispatch(companyResetSubmitCoupon());

    return () => {};
  }, [updateMode]);

  const handleCouponSubmit = () => {
    dispatch({ type: "RESET-COUPON-OP-FAILED" });
    if (addMode) {
      dispatch(companyAddCouponAction({ ...props.couponObject }));
    } else if (updateMode) {
      dispatch(companyUpdateCouponAction({ ...props.couponObject }));
    }
    dispatch(companySumbitCoupon());
  };
  return (
    <div>
      <div className="container p-1 comapny-operations-coupon-view ">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card  ">
              {/* ------------------------------------------------ */}
              <div className="company-operations-card-image-container">
                <img
                  className="card-img-top company-operations-card-image "
                  src={props.imgView}
                  alt=""
                />
              </div>
              {/* ------------------------------------------------ */}
              <div className="card-body border">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{props.couponObject.title}</h5>
                  {!props.categoryName.isNaN && props.categoryName > 0
                    ? document.getElementById(props.categoryName).textContent
                    : props.categoryName}
                </div>
              </div>
              <p className="card-text p-2">{props.couponObject.description}</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Start Date : {props.couponObject.startDate}
                </li>
                <li className="list-group-item">
                  End Date : {props.couponObject.endDate}
                </li>
              </ul>
              <div className="card-body d-flex justify-content-between">
                <div>Amount : {props.couponObject.amount}</div>
                <div>Price : {props.couponObject.price} $</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <input
              onClick={() => handleCouponSubmit()}
              className="w-100 p-1 company-opertaions-submit-btn btn-dark"
              type="button"
              value="Submit"
            />
          </div>
        </div>
        {submitMsgView ? (
          !errorMsg.failed ? (
            <div className="row">
              <div className="col-12 text-center">
                {addMode ? (
                  <span className="text-success w-100  p-1 fs-5 fw-bold">
                    Coupon added successfully
                  </span>
                ) : (
                  <span className="text-success w-100  p-1 fs-5 fw-bold">
                    Coupon updated successfully
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="m-2 fw-bold text-danger">{errorMsg.messege}</span>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CompanyOperationsCouponView;
