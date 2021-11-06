import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCouponsCardsFunc } from "./utils/CouponCardListFunctions";
const CouponCardList = (props) => {
  const [splitedSearchResultCouponList, setSplitedSearchResultCouponList] =
    useState([]);

  const [splitedAllCoupons, setSplitedAllCoupons] = useState([]);

  const searchResultCouponList = useSelector(
    (state) => state.uiRootReducer.searchResultCouponListReducer.couponList
  );

  useEffect(() => {
    if (props.searchMode) {
      setSplitedSearchResultCouponList(
        searchResultCouponList.slice(0, props.numberOfCoupons)
      );
      return;
    }
    setSplitedAllCoupons(props.couponList.slice(0, props.numberOfCoupons));
    return () => {};
  }, [
    props.userRole,
    props.numberOfCoupons,
    props.couponList,
    searchResultCouponList,
  ]);
  const getAllCouponsCards = () =>
    getAllCouponsCardsFunc(
      props.searchMode,
      splitedSearchResultCouponList,
      splitedAllCoupons
    );
  return (
    <div>
      <div className="row main-page-content-margin-top align-items-start ">
        {getAllCouponsCards()}
      </div>
    </div>
  );
};

export default CouponCardList;
