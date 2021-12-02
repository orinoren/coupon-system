import React from "react";

import "./CompanyOperations.css";
import { useEffect } from "react";
import { companyAddCouponAction } from "../../actions/actions-for-company/addCouponAction";
import { useDispatch, useSelector } from "react-redux";
import { companyResetSubmitCoupon } from "../../actions/actions-for-ui/action-for-ui";
import { companyUpdateCouponAction } from "../../actions/actions-for-company/updateCouponAction";
import { couponValidation } from "./utils/CompanyOperationsFunctions";
import { getCouponSubmitMsgFunc } from "./utils/CompanyOperationsFunctions";
const CompanyOperationsCouponView = (props) => {
  const dispatch = useDispatch();

  const couponOperationsDetails = useSelector(
    (state) => state.companyRootReducer.companyFailedCouponOpReducer
  );
  useEffect(() => {
    dispatch(companyResetSubmitCoupon());
    return () => {};
  }, [props.couponObject, props.addMode, dispatch]);

  const getCatgeoryForView = () => {
    const categoryDefaultValue = "Choose...";
    if (props.couponObject.category === categoryDefaultValue) {
      return "Category";
    }
    return props.categoryInputRef.current.selectedOptions[0].textContent;
  };

  const handleCouponSubmit = () => {
    dispatch({ type: "RESET-COUPON-OP-FAILED" });
    const isCouponValid = couponValidation(
      props.couponObject,
      props.titleErrorRef,
      props.categoryErrorRef,
      props.startDateErrorRef,
      props.endDateErrorRef,
      props.amountErrorRef,
      props.priceErrorRef
    );
    if (isCouponValid) {
      let couponObj = {
        id: props.couponObject.id,
        title: props.couponObject.title,
        description: props.couponObject.description,
        category: props.couponObject.category,
        startDate: props.couponObject.startDate,
        endDate: props.couponObject.endDate,
        amount: props.couponObject.amount,
        price: props.couponObject.price,
      };
      if (props.addMode) {
        dispatch(companyAddCouponAction(couponObj, props.couponObject.image));
        return;
      }
      if (props.updateMode) {
        dispatch(
          companyUpdateCouponAction(
            { ...couponObj, imageId: props.couponObject.couponImage },
            props.couponObject.image
          )
        );
      }
    }
  };
  const getCouponSubmitMsg = () => {
    return getCouponSubmitMsgFunc(couponOperationsDetails, props.addMode);
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
                  {getCatgeoryForView()}
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
        {props.isCouponSubmitted ? getCouponSubmitMsg() : " "}
      </div>
    </div>
  );
};

export default CompanyOperationsCouponView;
