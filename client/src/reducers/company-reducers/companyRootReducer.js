import { combineReducers } from "redux";
import companyAddCouponReducer from "./companyAddCouponReducer";
import companyGetAllCouponsReducer from "./companyGetAllCouponsReducer";
import companyUpdateCouponReducer from "./companyUpdateCouponReducer";
import companyDeleteCouponReducer from "./comanyDeleteCouponReducer";
import companyFailedCouponOpReducer from "./companyFailedCouponOpReducer";
const companyRootReducer = combineReducers({
  companyAddCouponReducer,
  companyGetAllCouponsReducer,
  companyUpdateCouponReducer,
  companyDeleteCouponReducer,
  companyFailedCouponOpReducer,
});
export default companyRootReducer;
