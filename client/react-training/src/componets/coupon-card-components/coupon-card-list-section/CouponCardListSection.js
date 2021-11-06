import React from "react";
import CouponCardList from "../coupon-card-list/CouponCardList";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCardListSectionControllersFunc,
  getCouponListFunc,
} from "../utils/CouponCardComponentsFunctions";

const CouponCardListSection = (props) => {
  const [numberOfCouponsToShow, setNumberOfCouponsToShow] = useState(6);

  const dispatch = useDispatch();
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
  const updatedCoupon = useSelector(
    (state) => state.companyRootReducer.companyUpdateCouponReducer
  );
  const userDetails = useSelector((state) => state.authReducer);

  const getCouponList = () =>
    getCouponListFunc(
      props.title,
      allCoupons,
      allCompanyCoupons,
      allCustomerCoupons
    );

  const getCardListSectionControllers = () =>
    getCardListSectionControllersFunc(
      setNumberOfCouponsToShow,
      numberOfCouponsToShow,
      props.searchMode,
      props.showCustomerCoupons,
      props.title,
      dispatch
    );

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
            {getCardListSectionControllers()}
          </div>
        </div>
        <div className="row card-list-section">
          <div className="col-12">
            <CouponCardList
              couponList={getCouponList()}
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
