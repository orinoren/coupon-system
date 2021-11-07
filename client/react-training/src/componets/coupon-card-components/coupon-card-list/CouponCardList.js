import React from "react";
import { useState, useEffect } from "react";
import { getAllCouponsCardsFunc } from "./utils/CouponCardListFunctions";
const CouponCardList = (props) => {
  const [splitedAllCoupons, setSplitedAllCoupons] = useState([
    ...props.couponList.slice(0, props.numberOfCoupons),
  ]);

  useEffect(() => {
    if (splitedAllCoupons.length > 0 && props.searchMode) {
      setSplitedAllCoupons([
        ...props.couponList.slice(0, props.numberOfCoupons),
      ]);
    }
    return () => {};
  }, [props.numberOfCoupons, props.couponList]);

  const getAllCouponsCards = () =>
    getAllCouponsCardsFunc(props.searchMode, splitedAllCoupons);

  console.log("card list render");
  return (
    <div>
      <div className="row main-page-content-margin-top align-items-start ">
        {getAllCouponsCards()}
      </div>
    </div>
  );
};

export default CouponCardList;
