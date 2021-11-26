import React from "react";
import { useState, useEffect } from "react";
import { getAllCouponsCardsFunc } from "./utils/CouponCardListFunctions";
const CouponCardList = (props) => {
  const [splitedAllCoupons, setSplitedAllCoupons] = useState([
    ...props.couponList.slice(0, props.numberOfCoupons.amount),
  ]);

  useEffect(() => {
    setSplitedAllCoupons([
      ...props.couponList.slice(0, props.numberOfCoupons.amount),
    ]);

    return () => {};
  }, [props.numberOfCoupons.amount, props.couponList]);

  const getAllCouponsCards = () =>
    getAllCouponsCardsFunc(
      props.searchMode,
      splitedAllCoupons,
      props.showCustomerCoupons
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
