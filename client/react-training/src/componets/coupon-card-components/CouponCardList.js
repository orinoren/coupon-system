import CouponCard from "./CouponCard";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const CouponCardList = (props) => {
  const [loading, setLoading] = useState(true);

  const searchResultCouponList = useSelector(
    (state) => state.uiRootReducer.searchResultCouponListReducer.couponList
  );

  const [splitedSearchResultCouponList, setSplitedSearchResultCouponList] =
    useState([]);

  const [splitedAllCoupons, setSplitedAllCoupons] = useState(
    props.couponList?.slice(0, props.numberOfCoupons)
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
    loading,
    props.couponList,
    searchResultCouponList,
  ]);

  const isLoading = () => {
    if (props.couponList?.length > 0 && loading === true) {
      setLoading(false);
    }
  };
  isLoading();
  return (
    <div>
      <div className="row main-page-content-margin-top align-items-start ">
        {props.searchMode ? (
          splitedSearchResultCouponList.length > 0 ? (
            splitedSearchResultCouponList.map((coupon) => (
              <div
                key={coupon.coupon_id}
                className="col-6  col-sm-4 col-lg-2  "
              >
                <CouponCard
                  coupon_id={coupon.coupon_id}
                  company_id={coupon.company_id}
                  category_id={coupon.category_id}
                  title={coupon.title}
                  description={coupon.description}
                  startDate={coupon.startDate}
                  endDate={coupon.endDate}
                  amount={coupon.amount}
                  price={coupon.price}
                  image={coupon.imageSrc}
                  couponImage={coupon.couponImage}
                  companyName={coupon.companyName}
                />
              </div>
            ))
          ) : (
            <span className="fs-2 fw-bolder text-success text-center p-3">
              Not found...
            </span>
          )
        ) : (
          splitedAllCoupons.map((coupon) => (
            <div key={coupon.coupon_id} className="col-6  col-sm-4 col-lg-2  ">
              <CouponCard
                coupon_id={coupon.coupon_id}
                company_id={coupon.company_id}
                category_id={coupon.category_id}
                title={coupon.title}
                description={coupon.description}
                startDate={coupon.startDate}
                endDate={coupon.endDate}
                amount={coupon.amount}
                price={coupon.price}
                image={coupon.imageSrc}
                couponImage={coupon.couponImage}
                companyName={coupon.companyName}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponCardList;
