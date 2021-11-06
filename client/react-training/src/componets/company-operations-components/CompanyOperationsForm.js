import React from "react";
import "./CompanyOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { companyResetSubmitCoupon } from "../../actions/actions-for-ui/action-for-ui";
const CompanyOperationsForm = (props) => {
  const dispatch = useDispatch();
  const isCouponSubmitted = useSelector(
    (state) =>
      state.uiRootReducer.companySubmitCouponReducer.companySubmitCoupon
  );
  const companyCouponUpdateMode = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.updateMode
  );

  useEffect(() => {
    document.getElementById(props.categoryName)?.removeAttribute("selected");
    return () => {};
  }, [companyCouponUpdateMode]);
  return (
    <div>
      <div className="container company-operation-border">
        <div className="row p-2">
          <div className="col-12">
            <form>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput">
                  Title
                </label>
                <span
                  id="coupon-title-input-error"
                  className="text-danger mx-2 coupon-input-error"
                ></span>
                <input
                  onFocus={(e) => {
                    document.getElementById(
                      "coupon-title-input-error"
                    ).textContent = " ";
                    if (isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  onChange={(e) => props.couponViewFunc(e, "title")}
                  value={props.couponToUpdateObj.title}
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
                    ></span>
                  </div>
                  <select
                    onChange={(e) => props.couponViewFunc(e, "category")}
                    onFocus={(e) => {
                      document.getElementById(
                        "coupon-category-input-error"
                      ).textContent = "";
                      if (isCouponSubmitted) {
                        dispatch(companyResetSubmitCoupon());
                      }
                    }}
                    className="my-2 custom-select inline-form-custom-select-coupon"
                    id="categoryOptions"
                  >
                    <option defaultValue>
                      {companyCouponUpdateMode &&
                      !props.categoryName.isNaN &&
                      props.categoryName > 0
                        ? document
                            .getElementById(props.categoryName)
                            .setAttribute("selected", "")
                        : "Choose..."}
                    </option>
                    <option id="1" value="1">
                      Food
                    </option>
                    <option id="2" value="2">
                      Electricty
                    </option>
                    <option id="3" value="3">
                      Restaurant
                    </option>
                    <option id="4" value="4">
                      Vacation
                    </option>
                    <option id="5" value="5">
                      Home Products
                    </option>
                    <option id="6" value="6">
                      Clothing products
                    </option>
                  </select>
                </div>
              </div>
              <div className="my-2 form-group">
                <label className="h6" htmlFor="formGroupExampleInput2">
                  Description
                </label>
                <textarea
                  value={props.couponToUpdateObj.description}
                  onFocus={(e) =>
                    isCouponSubmitted
                      ? dispatch(companyResetSubmitCoupon())
                      : ""
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
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "startDate")}
                  onFocus={(e) => {
                    document.getElementById(
                      "coupon-start-date-input-error"
                    ).textContent = "";
                    if (isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  value={props.couponToUpdateObj.startDate}
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
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "endDate")}
                  onFocus={(e) => {
                    document.getElementById(
                      "coupon-end-date-input-error"
                    ).textContent = "";
                    if (isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  value={props.couponToUpdateObj.endDate}
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
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "amount")}
                  onFocus={(e) => {
                    document.getElementById(
                      "coupon-amount-input-error"
                    ).textContent = "";
                    if (isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  type="number"
                  value={props.couponToUpdateObj.amount}
                  className="w-25 form-control form-control-coupon"
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
                ></span>
                <input
                  onChange={(e) => props.couponViewFunc(e, "price")}
                  onFocus={(e) => {
                    document.getElementById(
                      "coupon-price-input-error"
                    ).textContent = "";
                    if (isCouponSubmitted) {
                      dispatch(companyResetSubmitCoupon());
                    }
                  }}
                  type="number"
                  value={props.couponToUpdateObj.price}
                  className="w-25 form-control form-control-coupon"
                  id="imageInputForm"
                  min="0"
                />
              </div>
              <div className="form-group mt-3 d-flex justify-content-between">
                {/*------------------------------------------------------  */}
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
                  onFocus={(e) =>
                    isCouponSubmitted
                      ? dispatch(companyResetSubmitCoupon())
                      : ""
                  }
                  type="file"
                  className="form-control form-control-coupon-file"
                  id="form-image-input"
                  accept="image/*"
                />
                {/*------------------------------------------------------  */}
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
