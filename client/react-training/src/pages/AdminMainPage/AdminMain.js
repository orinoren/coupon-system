import React from "react";
import "./AdminMain.css";

import OperationButton from "../../componets/OperationsButtonComponents/OperationsButton";
import AdminOperations from "../../componets/AdminOperationsComponents/AdminOperationsContainer";
import MainSearchForm from "../../componets/SearchFormComponents/MainSearchForm";
import MainPageContent from "../../componets/MainPageContentComponent/MainPageContent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminOperationsBoxState,
  resetOpAction,
  resetSearchModeAction,
  showCompanyOpAction,
  showCustomerOpAction,
} from "../../actions/actions-for-ui/action-for-ui";
import { adminGetAllCustomersAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminGetAllCustomersActions";
import { adminGetAllCompaniesAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminGetAllCompaniesAction";
import {
  adminCustomerAddMode,
  adminCompanyAddMode,
  adminResetAddMode,
} from "../../actions/actions-for-ui/action-for-ui";
import { useHistory } from "react-router";

const AdminMain = () => {
  const dispatch = useDispatch();

  const showOp = useSelector(
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

  const handleOnAddCompanyClicked = () => {
    dispatch(resetSearchModeAction());
    dispatch(adminCompanyAddMode());
  };
  const handleOnAddCustomerClicked = () => {
    dispatch(adminCustomerAddMode());
  };
  const resetAddMode = () => {
    dispatch(resetSearchModeAction());
    dispatch(adminResetAddMode());
  };

  const history = useHistory();
  const loginDetails = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (loginDetails.role !== "ADMIN" || loginDetails.logged === false)
      history.push("/home");
    return () => {};
  }, [loginDetails.logged, loginDetails.role, history]);

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

  return (
    <div>
      <MainSearchForm
        placeholder={
          showOp.customerOp
            ? "Search customer..."
            : showOp.companyOp
            ? "Search company..."
            : "Search coupon..."
        }
      ></MainSearchForm>
      <div className="container">
        <div className="row  m-0 mt-md-5 justify-content-evenly">
          <div className="col-12 col-sm-6 order-2 order-md-1 col-md-2 align-self-center mb-0 ">
            <div
              onClick={() => {
                dispatch(adminOperationsBoxState("company"));
                dispatch(showCompanyOpAction());
              }}
            >
              {showOp.companyOp ? (
                <div onClick={() => handleOnAddCompanyClicked()}>
                  <OperationButton name="Add Company"></OperationButton>
                </div>
              ) : (
                <div onClick={() => resetAddMode()}>
                  <OperationButton name="Company Operations"></OperationButton>
                </div>
              )}
            </div>
          </div>
          {showOp.companyOp || showOp.customerOp ? (
            <div className="col-12 order-1 order-md-2 col-md-2 justify-content-center align-self-center m-0 mb-md-0">
              <div
                onClick={() => {
                  resetAddMode();
                  dispatch(resetOpAction());
                  dispatch(resetSearchModeAction());
                }}
              >
                <OperationButton name="Close Operations"></OperationButton>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="col-12 order-3  col-md-2 align-self-center">
            <div
              onClick={() => {
                dispatch(adminOperationsBoxState("customer"));
                dispatch(showCustomerOpAction());
                dispatch(resetSearchModeAction());
              }}
            >
              {showOp.customerOp ? (
                <div onClick={() => handleOnAddCustomerClicked()}>
                  <OperationButton name="Add Customer"></OperationButton>
                </div>
              ) : (
                <div
                  onClick={() => {
                    resetAddMode();
                    dispatch(resetSearchModeAction());
                  }}
                >
                  <OperationButton name="Customer Operations"></OperationButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showOp.companyOp ? (
        <AdminOperations type="company"></AdminOperations>
      ) : (
        ""
      )}
      {showOp.customerOp ? (
        <AdminOperations type="customer"></AdminOperations>
      ) : (
        ""
      )}
      <div className="m-0 mt-md-5">
        <MainPageContent title="TOP COUPONS"></MainPageContent>
      </div>
    </div>
  );
};

export default AdminMain;
