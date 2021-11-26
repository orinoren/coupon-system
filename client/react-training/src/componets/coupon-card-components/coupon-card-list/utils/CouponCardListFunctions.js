import CouponCard from "../../coupon-card/CouponCard";

export const getAllCouponsCardsFunc = (
  searchMode,
  splitedAllCoupons,
  showCustomerCoupons
) => {
  if (searchMode && splitedAllCoupons.length === 0) {
    return (
      <span className="fs-2 fw-bolder text-success text-center p-3">
        Not found...
      </span>
    );
  }
  return splitedAllCoupons.map((coupon) => (
    <div key={coupon.id} className="col-6  col-sm-4 col-lg-2  ">
      <CouponCard
        id={coupon.id}
        company_id={coupon.company_id}
        category={coupon.category}
        title={coupon.title}
        description={coupon.description}
        startDate={coupon.startDate}
        endDate={coupon.endDate}
        amount={coupon.amount}
        price={coupon.price}
        image={coupon.image}
        couponImage={coupon.imageId}
        companyName={coupon.companyName}
        sameCouponAmount={coupon.sameCouponAmount}
        showCustomerCoupons={showCustomerCoupons}
      />
    </div>
  ));
};
