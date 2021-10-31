import React from "react";

import "./MainPageContent.css";
import CouponCardListSection from "../CouponCardComponents/CouponCardListSection";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyCouponsAction } from "../../actions/actions-for-company/getAllCompanyCouponsAction";
import { getAllCouponsAction } from "../../actions/actions-for-guest/getAllCouponsAction";
import { getAllCustomerCouponsAction } from "../../actions/actions-for-customer/getCustomerCoupons";
const MainPageContent = (props) => {
  const dispatch = useDispatch();
  const showSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );
  const showOp = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const showCustomerCoupons = useSelector(
    (state) =>
      state.uiRootReducer.showCustomerCouponsReducer.showCustomerCoupons
  );

  const addedCoupon = useSelector(
    (state) => state.companyRootReducer.companyAddCouponReducer
  );

  const updatedCoupon = useSelector(
    (state) => state.companyRootReducer.companyUpdateCouponReducer
  );

  const deletedCoupon = useSelector(
    (state) => state.companyRootReducer.companyDeleteCouponReducer
  );
  const companyMode = useSelector(
    (state) => state.uiRootReducer.globalModeReducer.companyMode
  );
  const userDetails = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userDetails.role === "COMPANY" || companyMode) {
      dispatch(getAllCompanyCouponsAction());
    } else if (
      userDetails.role === "CUSTOMER" ||
      userDetails.role === "ADMIN"
    ) {
      if (userDetails.role === "CUSTOMER") {
        dispatch(getAllCustomerCouponsAction());
      }
      dispatch(getAllCouponsAction());
    } else {
      dispatch(getAllCouponsAction());
    }
    return () => {};
  }, [addedCoupon, updatedCoupon, deletedCoupon, userDetails, dispatch]);
  return (
    <div className="mt-4">
      <div className="row m-0 m-md-1  main-content-top-margin">
        {showSearchMode && !showOp.customerOp && !showOp.companyOp ? (
          <div className="m-0 m-md-1">
            <CouponCardListSection
              searchMode={showSearchMode}
              title="Result"
            ></CouponCardListSection>
          </div>
        ) : (
          " "
        )}
        {showCustomerCoupons ? (
          <div className="m-0 m-md-1">
            <CouponCardListSection
              showCustomerCoupons={showCustomerCoupons}
              title="Your Coupons(CUSTOMER)"
            ></CouponCardListSection>
          </div>
        ) : (
          " "
        )}

        {userDetails.role === "COMPANY" ? (
          <CouponCardListSection title="Your Coupons(COMPANY)"></CouponCardListSection>
        ) : (
          <div className="m-0 m-md-1">
            <div className="m-0 m-md-1">
              <CouponCardListSection title="TOP COUPONS"></CouponCardListSection>
            </div>

            <div className="m-0 m-md-1">
              <CouponCardListSection title="FOOD"></CouponCardListSection>
            </div>
            <div className="m-0 m-md-1">
              <CouponCardListSection title="VACATION"></CouponCardListSection>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageContent;
