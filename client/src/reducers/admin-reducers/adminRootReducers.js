import { combineReducers } from "redux";

import adminGetAllCompaniesReducer from "./adminGetAllCompaniesReducer";
import adminGetAllCustomersReducer from "./adminGetAllCustomersReducer";
import adminAddCompanyReducer from "./adminAddCompanyReducer";
import adminAddCustomerReducer from "./adminAddCustomerReducer";
import adminUpdateCompanyReducer from "./adminUpdateCompanyReducer";
import adminUpdateCustomerReducer from "./adminUpdateCustomerReducer";
import adminDeleteCustomerReducer from "./adminDeleteCustomerReducer";
import adminDeleteCompanyReducer from "./adminDeleteCompanyReducer";
const adminRootReducer = combineReducers({
  adminGetAllCompaniesReducer,
  adminGetAllCustomersReducer,
  adminAddCompanyReducer,
  adminAddCustomerReducer,
  adminUpdateCompanyReducer,
  adminUpdateCustomerReducer,
  adminDeleteCompanyReducer,
  adminDeleteCustomerReducer,
});

export default adminRootReducer;
