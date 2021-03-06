import React from "react";
import "./AdminMain.css";
import {
  getMainSearchFormForCompany,
  getMainSearchFormForCustomer,
  getOperationsButtonForCompanyFunc,
  getCloseOperationButtonFunc,
  getOperationsButtonForCustomerFunc,
} from "./utils/AdminMainFunctions";
import { adminGetAllCustomersAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminGetAllCustomersActions";
import { adminGetAllCompaniesAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminGetAllCompaniesAction";
import AdminOperationsContainer from "../../componets/admin-operations-components/admin-operations-container/AdminOperationsContainer";
import MainSearchForm from "../../componets/search-form-components/MainSearchForm";
import MainPageContent from "../../componets/main-page-content-component/MainPageContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router";

const AdminMain = () => {
  const dispatch = useDispatch();

  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const addedCompany = useSelector(
    (state) => state.adminRootReducer.adminAddCompanyReducer
  );

  const addedCustomer = useSelector(
    (state) => state.adminRootReducer.adminAddCustomerReducer
  );

  const updatedCompany = useSelector(
    (state) => state.adminRootReducer.adminUpdateCompanyReducer
  );

  const updatedCustomer = useSelector(
    (state) => state.adminRootReducer.adminUpdateCustomerReducer
  );

  const deletedCompany = useSelector(
    (state) => state.adminRootReducer.adminDeleteCompanyReducer.company_id
  );

  const deletedCustomer = useSelector(
    (state) => state.adminRootReducer.adminDeleteCustomerReducer.customerId
  );
  const userDetails = useSelector((state) => state.authReducer);

  const history = useHistory();

  useEffect(() => {
    if (userDetails.role !== "ADMIN" || userDetails.isLogged === false)
      if (localStorage.getItem("Role") !== "ADMIN") {
        history.push("/unauthorized");
      }
    return () => {};
  }, [userDetails.isLogged, userDetails.role, history]);

  useEffect(() => {
    if (showOperationsFor.customerOp) {
      dispatch(adminGetAllCustomersAction());
      return;
    }
    if (showOperationsFor.companyOp) {
      dispatch(adminGetAllCompaniesAction());
      return;
    }
    dispatch(adminGetAllCustomersAction());
    dispatch(adminGetAllCompaniesAction());
    return () => {};
  }, [
    dispatch,
    addedCustomer,
    addedCompany,
    updatedCustomer,
    updatedCompany,
    deletedCustomer,
    deletedCompany,
    showOperationsFor.companyOp,
    showOperationsFor.customerOp,
  ]);

  const getMainSearchForm = () => {
    if (showOperationsFor.customerOp) {
      return getMainSearchFormForCustomer();
    }
    if (showOperationsFor.companyOp) {
      return getMainSearchFormForCompany();
    }
    return <MainSearchForm placeholder="Search coupon..."></MainSearchForm>;
  };

  const getOperationsButtonForCompany = () => {
    const isCompanyOperationMode = true;
    if (showOperationsFor.companyOp) {
      return getOperationsButtonForCompanyFunc(
        isCompanyOperationMode,
        dispatch
      );
    }
    return getOperationsButtonForCompanyFunc(!isCompanyOperationMode, dispatch);
  };

  const getOperationsButtonForCustomer = () => {
    if (showOperationsFor.customerOp) {
      return getOperationsButtonForCustomerFunc(true, dispatch);
    }
    return getOperationsButtonForCustomerFunc(false, dispatch);
  };
  const getCloseOperationsButton = () => {
    if (showOperationsFor.companyOp || showOperationsFor.customerOp) {
      return getCloseOperationButtonFunc(dispatch);
    }
    return "";
  };

  const getAllCustomerOrCompaniesForOpertions = () => {
    if (showOperationsFor.companyOp) {
      return (
        <AdminOperationsContainer type="company"></AdminOperationsContainer>
      );
    }
    if (showOperationsFor.customerOp) {
      return (
        <AdminOperationsContainer type="customer"></AdminOperationsContainer>
      );
    }
    return "";
  };
  return (
    <div>
      {getMainSearchForm()}
      <div className="container">
        <div className="row m-0 mt-md-5 justify-content-evenly">
          {getOperationsButtonForCompany()}
          {getCloseOperationsButton()}
          {getOperationsButtonForCustomer()}
        </div>
      </div>
      {getAllCustomerOrCompaniesForOpertions()}
      <div className="m-0 mt-md-5">
        <MainPageContent title="TOP COUPONS"></MainPageContent>
      </div>
    </div>
  );
};
export default AdminMain;
