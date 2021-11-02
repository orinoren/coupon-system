import React from "react";
import "./AdminMain.css";
import {
  getMainSearchFormForCompany,
  getMainSearchFormForCustomer,
  getOperationsButtonForCompanyFunc,
  getCloseOperationButtonFunc,
  getOperationsButtonForCustomerFunc,
} from "./AdminMainFunctions";
import { adminGetAllCustomersAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminGetAllCustomersActions";
import { adminGetAllCompaniesAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminGetAllCompaniesAction";
import AdminOperations from "../../componets/AdminOperationsComponents/AdminOperationsContainer";
import MainSearchForm from "../../componets/SearchFormComponents/MainSearchForm";
import MainPageContent from "../../componets/MainPageContentComponent/MainPageContent";
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
    (state) => state.adminRootReducer.adminDeleteCompanyReducer.companyId
  );

  const deletedCustomer = useSelector(
    (state) => state.adminRootReducer.adminDeleteCustomerReducer.customerId
  );
  const loginDetails = useSelector((state) => state.authReducer);

  const history = useHistory();

  useEffect(() => {
    if (loginDetails.role !== "ADMIN" || loginDetails.isLogged === false)
      history.push("/home");
    return () => {};
  }, [loginDetails.isLogged, loginDetails.role, history]);

  useEffect(() => {
    dispatch(adminGetAllCompaniesAction());
    dispatch(adminGetAllCustomersAction());

    return () => {};
  }, [
    dispatch,
    addedCustomer,
    addedCompany,
    updatedCustomer,
    updatedCompany,
    deletedCustomer,
    deletedCompany,
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
    } else {
      return getOperationsButtonForCompanyFunc(
        !isCompanyOperationMode,
        dispatch
      );
    }
  };

  const getOperationsButtonForCustomer = () => {
    if (showOperationsFor.customerOp) {
      return getOperationsButtonForCustomerFunc(true, dispatch);
    } else {
      return getOperationsButtonForCustomerFunc(false, dispatch);
    }
  };
  const getCloseOperationsButton = () => {
    if (showOperationsFor.companyOp || showOperationsFor.customerOp) {
      return getCloseOperationButtonFunc(dispatch);
    }
    return "";
  };

  const getAllCustomerOrCompaniesForOpertions = () => {
    if (showOperationsFor.companyOp) {
      return <AdminOperations type="company"></AdminOperations>;
    } else if (showOperationsFor.customerOp) {
      return <AdminOperations type="customer"></AdminOperations>;
    } else {
      return "";
    }
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
