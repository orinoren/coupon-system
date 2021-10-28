import { combineReducers } from "redux";

import {
  companySubmitCouponReducer,
  adminOpBoxTypeReducer,
  adminAddModeOpReducer,
  adminUpdateModeOpReducer,
  companyUpdateCouponModeReducer,
  companyAddCouponModeReducer,
  globalModeReducer,
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
  adminOpBoxTypeReducer,
  adminAddModeOpReducer,
  adminUpdateModeOpReducer,
  companySubmitCouponReducer,
  companyUpdateCouponModeReducer,
  companyAddCouponModeReducer,
  globalModeReducer,
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
