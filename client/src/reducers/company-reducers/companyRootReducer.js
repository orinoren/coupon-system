import { combineReducers } from "redux";
import companyAddCouponReducer from "./companyAddCouponReducer";
import companyGetAllCouponsReducer from "./companyGetAllCouponsReducer";
import companyUpdateCouponReducer from "./companyUpdateCouponReducer";
import companyDeleteCouponReducer from "./comanyDeleteCouponReducer";
import companyFailedCouponnOpReducer from "./companyFailedCouponnOpReducer";
const companyRootReducer = combineReducers({
  companyAddCouponReducer,
  companyGetAllCouponsReducer,
  companyUpdateCouponReducer,
  companyDeleteCouponReducer,
  companyFailedCouponnOpReducer,
});
export default companyRootReducer;
