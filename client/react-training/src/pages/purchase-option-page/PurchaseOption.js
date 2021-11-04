import React from "react";
import MainPageContent from "../../componets/main-page-content-component/MainPageContent";
import PurchaseCouponSection from "../../componets/PurchaseOptionComponents/PurchaseCouponSection";
import "./PurchaseOption.css";
const PurchaseOption = () => {
  return (
    <div className="purchase-coupon-bg">
      <div>
        <PurchaseCouponSection></PurchaseCouponSection>
      </div>
      <div>
        <MainPageContent></MainPageContent>
      </div>
    </div>
  );
};

export default PurchaseOption;
