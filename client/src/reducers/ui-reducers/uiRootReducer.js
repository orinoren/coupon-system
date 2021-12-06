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
  searchResultCustomerListReducer,
  searchResultCompanyListReducer,
  showOpForAdminReducer,
  showCustomerCouponsReducer,
});

export default uiRootReducer;
