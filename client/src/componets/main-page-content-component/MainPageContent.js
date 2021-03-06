import React from "react";

import "./MainPageContent.css";
import CouponCardListSection from "../coupon-card-components/coupon-card-list-section/CouponCardListSection";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyCouponsAction } from "../../actions/actions-for-company/getAllCompanyCouponsAction";
import { getAllCouponsAction } from "../../actions/actions-for-global/getAllCouponsAction";
import { getAllCustomerCouponsAction } from "../../actions/actions-for-customer/getCustomerCoupons";
import authenticatedAxiosObj from "../../service/AuthenticatedAxios";
const MainPageContent = () => {
  const dispatch = useDispatch();
  const showSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );
  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const purchaseSucceed = useSelector(
    (state) => state.customerRootReducer.purchaseCouponReducer.purchaseSucceed
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
  const allCategories = useSelector(
    (state) => state.getAllCategoriesReducer.allCategories
  );

  const userDetails = useSelector((state) => state.authReducer);
  useEffect(() => {
    switch (userDetails.role) {
      case "COMPANY":
        dispatch(getAllCompanyCouponsAction());
        break;
      case "ADMIN":
        dispatch(getAllCouponsAction());
        break;
      case "CUSTOMER":
        dispatch(getAllCustomerCouponsAction());
        dispatch(getAllCouponsAction());
        break;
      default:
        if (userDetails.role !== "GUEST") {
          if (localStorage.getItem("Jwt")) {
            dispatch({
              type: "LOGIN-SUCCEED",
              payload: {
                token: localStorage.getItem("Jwt"),
                role: localStorage.getItem("Role"),
                isLogged: true,
              },
            });
            authenticatedAxiosObj.setUserToken(localStorage.getItem("Jwt"));
          }
        }
        dispatch(getAllCouponsAction());
        break;
    }
    return () => {};
  }, [
    addedCoupon,
    updatedCoupon,
    deletedCoupon,
    purchaseSucceed,
    userDetails,
    dispatch,
  ]);
  return (
    <div className="mt-2 mt-md-4">
      <div className="row m-0 m-md-1  main-content-top-margin">
        {showSearchMode &&
        !showOperationsFor.customerOp &&
        !showOperationsFor.companyOp ? (
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
            {allCategories.map((category) => {
              return (
                <div key={category.id} className="m-0 m-md-1">
                  <CouponCardListSection
                    title={category.name}
                  ></CouponCardListSection>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageContent;
