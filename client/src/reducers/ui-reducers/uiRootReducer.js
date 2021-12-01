import { combineReducers } from "redux";

import {
  companySubmitCouponReducer,
  adminAddModeOpReducer,
  adminUpdateModeOpReducer,
  companyUpdateCouponModeReducer,
  companyAddCouponModeReducer,
  cartPropertisReducer,
  cartArrReducer,
  showCartModeReducer,
  searchModeReducer,
  searchResultCouponListReducer,
  searchResultCompanyListReducer,
  searchResultCustomerListReducer,
  showOpForAdminReducer,
  showCustomerCouponsReducer,
} from "./adminOpBoxTypeReducer";

const uiRootReducer = combineReducers({
  adminAddModeOpReducer,
  adminUpdateModeOpReducer,
  companySubmitCouponReducer,
  companyUpdateCouponModeReducer,
  companyAddCouponModeReducer,
  cartPropertisReducer,
  cartArrReducer,
  showCartModeReducer,
  searchModeReducer,
  searchResultCouponListReducer,
  searchResultCustomerListReducer,
  searchResultCompanyListReducer,
  showOpForAdminReducer,
  showCustomerCouponsReducer,
});

export default uiRootReducer;
