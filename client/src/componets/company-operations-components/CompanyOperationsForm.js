import React from "react";
import "./CompanyOperations.css";
import { useDispatch, useSelector } from "react-redux";

import { companyResetSubmitCoupon } from "../../actions/actions-for-ui/action-for-ui";
const CompanyOperationsForm = (props) => {
  const dispatch = useDispatch();
  const allCategories = useSelector(
    (state) => state.getAllCategoriesReducer.allCategories
  );
  return (
    <div>
      <div className="container company-operation-border">
        <div className="row p-2">
          <div className="col-12">
            <form ref={props.serverErrorRef}>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput">
                  Title
                </label>
                <span
                  id="coupon-title-input-error"
                  className="text-danger mx-2 coupon-input-error"
                  ref={props.titleErrorRef}
                ></span>
                <input
                  onFocus={() => {
                    props.titleErrorRef.current.textContent = " ";
                    if (props.isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  onChange={(e) => props.couponViewFunc(e, "title")}
                  value={props.couponObject.title}
                  type="text"
                  className="form-control form-control-coupon w-75"
                  id="formGroupExampleInput"
                  autoComplete="off"
                />
              </div>
              <div className="form-group my-3">
                <div className=" d-flex-col ">
                  <div className="w-100">
                    <label
                      className=" h6 ml-2"
                      htmlFor="inlineFormCustomSelect"
                    >
                      Category
                    </label>
                    <span
                      id="coupon-category-input-error"
                      className="text-danger mx-2 coupon-input-error"
                      ref={props.categoryErrorRef}
                    ></span>
                  </div>
                  <select
                    value={props.couponObject.category}
                    onChange={(e) => props.couponViewFunc(e, "category")}
                    onFocus={() => {
                      props.categoryErrorRef.current.textContent = "";
                      if (props.isCouponSubmitted) {
                        dispatch(companyResetSubmitCoupon());
                      }
                    }}
                    className="my-2 custom-select inline-form-custom-select-coupon"
                    id="categoryOptions"
                    ref={props.categoryInputRef}
                  >
                    <option unselectable="true" disabled>
                      Choose...
                    </option>
                    {allCategories.map((category) => (
                      <option
                        key={category.id}
                        id={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput2">
                  Description
                </label>
                <textarea
                  value={props.couponObject.description}
                  onFocus={() =>
                    props.isCouponSubmitted
                      ? dispatch(companyResetSubmitCoupon())
                      : " "
                  }
                  onInput={(e) => props.couponViewFunc(e, "description")}
                  className="w-75 form-control form-control-coupon"
                  rows="3"
                ></textarea>
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formStartDateInput">
                  Start date
                </label>
                <span
                  id="coupon-start-date-input-error"
                  className="text-danger mx-2 coupon-input-error"
                  ref={props.startDateErrorRef}
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "startDate")}
                  onFocus={() => {
                    props.startDateErrorRef.current.textContent = "";
                    if (props.isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  value={props.couponObject.startDate}
                  type="date"
                  className=" w-50 form-control form-control-coupon-date form-control-coupon"
                  id="formStartDateInput"
                />
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formEndDateInput">
                  End date
                </label>
                <span
                  id="coupon-end-date-input-error"
                  className="text-danger mx-2 
                  coupon-input-error"
                  ref={props.endDateErrorRef}
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "endDate")}
                  onFocus={() => {
                    props.endDateErrorRef.current.textContent = "";
                    if (props.isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  value={props.couponObject.endDate}
                  type="date"
                  className="w-50 form-control form-control-coupon-date form-control-coupon"
                  id="formEndDateInput"
                />
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput">
                  Amount
                </label>
                <span
                  id="coupon-amount-input-error"
                  className="text-danger mx-2
                  coupon-input-error"
                  ref={props.amountErrorRef}
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "amount")}
                  onFocus={() => {
                    props.amountErrorRef.current.textContent = "";
                    if (props.isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  type="number"
                  value={props.couponObject.amount}
                  className="w-25 form-cntrol form-control-coupon"
                  id="formGroupExampleInput"
                  min="1"
                />
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput">
                  Price
                </label>
                <span
                  id="coupon-price-input-error"
                  className="text-danger mx-2 coupon-input-error"
                  ref={props.priceErrorRef}
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "price")}
                  onFocus={() => {
                    props.priceErrorRef.current.textContent = "";
                    if (props.isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  type="number"
                  value={props.couponObject.price}
                  className="w-25 form-cntrol form-control-coupon"
                  id="imageInputForm"
                  min="0"
                />
              </div>
              <div className="form-group mt-3 d-flex justify-content-between">
                <label
                  className="form-image-label p-2"
                  htmlFor="form-image-input"
                >
                  Upload Coupon Image
                </label>
                <input
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                  onChange={(e) => props.couponViewFunc(e, "image")}
                  onFocus={() =>
                    props.isCouponSubmitted
                      ? dispatch(companyResetSubmitCoupon())
                      : ""
                  }
                  type="file"
                  className="form-control form-control-coupon-file"
                  id="form-image-input"
                  accept="image/*"
                />
                <div
                  onClick={(e) => {
                    props.couponViewFunc(e, "clear-form");
                  }}
                  className="form-clear-label p-2 "
                >
                  Clear
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOperationsForm;
