import { combineReducers } from "redux";
import purchaseCouponReducer from "./customerPurchaseCouponReducer";
import customerGetAllCouponsReducer from "./customerGetAllCouponsReducer";
const customerRootReducer = combineReducers({
  purchaseCouponReducer,
  customerGetAllCouponsReducer,
});
export default customerRootReducer;
