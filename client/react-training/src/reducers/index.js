import { combineReducers } from "redux";
import adminRootReducer from "./admin-reducers/adminRootReducers";
import companyRootReducer from "./company-reducers/companyRootReducer";
import customerRootReducer from "./customer-reducers/customerRootReducer";
import uiRootReducer from "./ui-reducers/uiRootReducer";
import authReducer from "./authReducer";
import getAllCouponsReducer from "./getAllCouponsReducer";
import getAllCouponsImagesReducer from "./getAllCouponsImagesReducers";
const allReducers = combineReducers({
  adminRootReducer,
  companyRootReducer,
  customerRootReducer,
  uiRootReducer,
  authReducer,
  getAllCouponsReducer,
  getAllCouponsImagesReducer,
});

export default allReducers;
