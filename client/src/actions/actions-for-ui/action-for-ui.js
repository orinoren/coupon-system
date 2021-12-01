export const adminCompanyAddMode = () => {
  return {
    type: "ADMIN-COMPANY-ADD-MODE",
  };
};
export const adminCustomerAddMode = () => {
  return {
    type: "ADMIN-CUSTOMER-ADD-MODE",
  };
};
export const adminResetAddMode = () => {
  return {
    type: "ADMIN-RESET-ADD-MODE",
  };
};
export const adminCompanyUpdateMode = () => {
  return {
    type: "ADMIN-COMPANY-UPDATE-MODE",
  };
};
export const adminCustomerUpdateMode = () => {
  return {
    type: "ADMIN-CUSTOMER-UPDATE-MODE",
  };
};
export const adminResetUpdateMode = () => {
  return {
    type: "ADMIN-RESET-UPDATE-MODE",
  };
};
export const companySubmitCoupon = () => {
  return {
    type: "COMPANY-SUBMIT-COUPON",
  };
};
export const companyResetSubmitCoupon = () => {
  return {
    type: "COMPANY-RESET-SUBMIT-COUPON",
  };
};
export const companyCouponUpdateModeAction = (coupon) => {
  return {
    type: "COMPANY-COUPON-UPDATE-MODE",
    payload: {
      id: coupon.id,
      title: coupon.title,
      category: coupon.category,
      description: coupon.description,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      amount: coupon.amount,
      price: coupon.price,
      image: coupon.image,
      couponImage: coupon.couponImage,
    },
  };
};
export const companyCouponResetUpdateModeAction = () => {
  return {
    type: "COMPANY-COUPON-RESET-UPDATE-MODE",
  };
};
export const companyCouponAddModeAction = () => {
  return {
    type: "COMPANY-COUPON-ADD-MODE",
  };
};
export const companyCouponResetAddModeAction = () => {
  return {
    type: "COMPANY-COUPON-RESET-ADD-MODE",
  };
};

export const resetUserModeAction = () => {
  return {
    type: "RESET-USER-MODE",
  };
};

export const incrementCartNotificationAction = (price) => {
  return {
    type: "INCREMENT-CART-NOTIFICATION",
    payload: { price },
  };
};
export const decrementCartNotificationAction = (price) => {
  return {
    type: "DECREMENT-CART-NOTIFICATION",
    payload: { price },
  };
};
export const resetCartNotificationAction = (price) => {
  return {
    type: "RESET-CART-NOTIFICATION",
  };
};
export const addToCartAction = (coupon) => {
  return {
    type: "ADD-TO-CART",
    payload: { ...coupon },
  };
};
export const removeFromCartAction = (coupon) => {
  return {
    type: "REMOVE-FROM-CART",
    payload: { ...coupon },
  };
};
export const resetCartAction = (coupon) => {
  return {
    type: "RESET-CART",
  };
};
export const cartShowViewAction = () => {
  return {
    type: "SHOW-CART-MODE",
  };
};
export const cartResetShowViewAction = () => {
  return {
    type: "RESET-SHOW-CART-MODE",
  };
};
export const searchModeAction = () => {
  return {
    type: "SEARCH-MODE",
  };
};
export const resetSearchModeAction = () => {
  return {
    type: "RESET-SEARCH-MODE",
  };
};
export const showCompanyOpAction = () => {
  return {
    type: "SHOW-COMPANY-OP",
  };
};
export const showCustomerOpAction = () => {
  return {
    type: "SHOW-CUSTOMER-OP",
  };
};
export const resetOpAction = () => {
  return {
    type: "RESET-SHOW-OP",
  };
};
export const showCustomerCouponsAction = () => {
  return {
    type: "SHOW-CUSTOMER-COUPONS",
  };
};
export const resetShowCustomerCouponsAction = () => {
  return {
    type: "RESET-SHOW-CUSTOMER-COUPONS",
  };
};
