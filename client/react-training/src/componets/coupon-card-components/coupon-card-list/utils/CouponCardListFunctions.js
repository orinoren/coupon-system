import CouponCard from "../../coupon-card/CouponCard";
export const getAllCouponsCardsFunc = (
  searchMode,
  splitedSearchResultCouponList,
  splitedAllCoupons
) => {
  if (searchMode) {
    if (splitedSearchResultCouponList.length > 0) {
      return splitedSearchResultCouponList.map((coupon) => (
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
      ));
    }
    return (
      <span className="fs-2 fw-bolder text-success text-center p-3">
        Not found...
      </span>
    );
  }
  return splitedAllCoupons.map((coupon) => (
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
  ));
};
