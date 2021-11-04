import React from "react";
import CouponCardList from "../../componets/CouponCardComponents/CouponCardList";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetSearchModeAction,
  resetShowCustomerCouponsAction,
} from "../../actions/actions-for-ui/action-for-ui";

const CouponCardListSection = (props) => {
  const dispatch = useDispatch();
  const [numberOfCouponsToShow, setNumberOfCouponsToShow] = useState(6);
  const allCompanyCoupons = useSelector(
    (state) =>
      state.companyRootReducer.companyGetAllCouponsReducer.companyCoupons
  );
  const allCoupons = useSelector(
    (state) => state.getAllCouponsReducer.allCoupons
  );
  const allCustomerCoupons = useSelector(
    (state) =>
      state.customerRootReducer.customerGetAllCouponsReducer.customerCoupons
  );

  function getCouponList() {
    switch (props.title) {
      case "TOP COUPONS":
        return allCoupons;
      case "Your Coupons(COMPANY)":
        return allCompanyCoupons;
      case "Your Coupons(CUSTOMER)":
        return allCustomerCoupons;
      case "FOOD":
        return allCoupons.filter((coupon) => coupon.category_id === 1);
      case "VACATION":
        return allCoupons.filter((coupon) => coupon.category_id === 4);
      default:
        break;
    }
  }
  const list = getCouponList();
  const updatedCoupon = useSelector(
    (state) => state.companyRootReducer.companyUpdateCouponReducer
  );
  const userDetails = useSelector((state) => state.authReducer);

  const handleSeeMoreClicked = () => {
    setNumberOfCouponsToShow(numberOfCouponsToShow + 6);
  };
  const handleSeeLessClicked = () => {
    if (numberOfCouponsToShow !== 6) {
      setNumberOfCouponsToShow(numberOfCouponsToShow - 6);
    }
  };
  const handleExitCouponListSectionButtonClicked = (title) => {
    if (title === "Result") {
      dispatch(resetSearchModeAction());
    } else {
      dispatch(resetShowCustomerCouponsAction());
    }
  };
  return (
    <div>
      <div className="container-fluid m-0 m-md-2 p-0 p-md-2">
        <div className="row justify-content-between main-page-content-header ">
          <div className="h3 mb-2 pl-2 col-3 pt-1">
            {props.title.includes("Your Coupons")
              ? props.title.substring(0, 12)
              : props.title}
          </div>
          <div className="mb-2 align-self-end p-0  text-center col-2  ">
            <div>
              see{" "}
              <span
                className="main-page-see-more"
                onClick={() => handleSeeMoreClicked()}
              >
                more
              </span>
              /
              <span
                className="main-page-see-less"
                onClick={() => handleSeeLessClicked()}
              >
                less
              </span>
              {props.searchMode || props.showCustomerCoupons ? (
                <i
                  onClick={() =>
                    handleExitCouponListSectionButtonClicked(props.title)
                  }
                  className=" far px-4 fs-2 text-success fa-times-circle"
                ></i>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="row card-list-section">
          <div className="col-12">
            <CouponCardList
              couponList={list}
              searchMode={props.searchMode}
              showCustomerCoupons={props.showCustomerCoupons}
              numberOfCoupons={numberOfCouponsToShow}
              userRole={userDetails.role}
              updatedCoupon={updatedCoupon}
            ></CouponCardList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCardListSection;
