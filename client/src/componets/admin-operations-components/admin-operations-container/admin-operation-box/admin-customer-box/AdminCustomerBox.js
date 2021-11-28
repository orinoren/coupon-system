import React from "react";
import "../../../AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { adminAddCustomerAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminAddCustomerAction";
import AdminBoxButtons from "../AdminBoxButtons";
import { adminCustomerUpdateMode } from "../../../../../actions/actions-for-ui/action-for-ui";
import {
  customerValidationToAdd,
  customerValidationToUpdate,
  dispatchDeletedCustomer,
  dispatchUpdatedCustomer,
  getCustomerBoxFunc,
  getCustomerBoxToAddFunc,
  getCustomerBoxToUpdateFunc,
} from "./utils/CustomerBoxFunctions";
const AdminCustomerBox = (props) => {
  const [firstNameState, setFirstNameState] = useState(props.firstName);
  const [lastNameState, setLastNameState] = useState(props.lastName);
  const [emailState, setEmailState] = useState(props.email);
  const [passwordState, setPasswordState] = useState(props.password);
  const [updateMode, setUpdateMode] = useState(false);

  const server_error_for_add_customer = useRef("");
  const server_error_for_update_customer = useRef("");
  const customer_update_first_name_error_messege = useRef("");
  const customer_update_last_name_error_messege = useRef("");
  const customer_update_email_error_messege = useRef("");
  const customer_update_password_error_messege = useRef("");

  const customer_add_first_name_error_messege = useRef("");
  const customer_add_last_name_error_messege = useRef("");
  const customer_add_email_error_messege = useRef("");
  const customer_add_password_error_messege = useRef("");

  const isSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );
  const dispatch = useDispatch();

  const submit = () => {
    if (updateMode) {
      const isUpdateValid = customerValidationToUpdate(
        firstNameState,
        lastNameState,
        emailState,
        passwordState,
        props.id,
        customer_update_first_name_error_messege,
        customer_update_last_name_error_messege,
        customer_update_email_error_messege,
        customer_update_password_error_messege
      );
      if (isUpdateValid) {
        const customerObj = {
          id: props.id,
          first_name: firstNameState,
          last_name: lastNameState,
          email: emailState,
          password: passwordState,
        };
        dispatchUpdatedCustomer(
          customerObj,
          isSearchMode,
          dispatch,
          setUpdateMode,
          server_error_for_update_customer
        );
      }
      return;
    }
    const isAddValid = customerValidationToAdd(
      firstNameState,
      lastNameState,
      emailState,
      passwordState,
      customer_add_first_name_error_messege,
      customer_add_last_name_error_messege,
      customer_add_email_error_messege,
      customer_add_password_error_messege
    );
    if (isAddValid) {
      const customerObj = {
        first_name: firstNameState,
        last_name: lastNameState,
        email: emailState,
        password: passwordState,
      };
      dispatch(
        adminAddCustomerAction(customerObj, server_error_for_add_customer)
      );
    }
  };

  const handleUpdateClicked = () => {
    dispatch(adminCustomerUpdateMode());
    setUpdateMode(true);
  };

  const handleDeleteClicked = (idToDelete) => {
    dispatchDeletedCustomer(idToDelete, isSearchMode, dispatch);
  };
  const getCustomerBoxToAdd = () =>
    getCustomerBoxToAddFunc(
      setFirstNameState,
      setLastNameState,
      setEmailState,
      setPasswordState,
      server_error_for_add_customer,
      customer_add_first_name_error_messege,
      customer_add_last_name_error_messege,
      customer_add_email_error_messege,
      customer_add_password_error_messege
    );

  const getCustomerBoxToUpdate = () =>
    getCustomerBoxToUpdateFunc(
      setFirstNameState,
      firstNameState,
      setLastNameState,
      lastNameState,
      setEmailState,
      emailState,
      setPasswordState,
      passwordState,
      props.id,
      server_error_for_update_customer,
      customer_update_first_name_error_messege,
      customer_update_last_name_error_messege,
      customer_update_email_error_messege,
      customer_update_password_error_messege
    );

  const getCustomerBox = () =>
    getCustomerBoxFunc(
      firstNameState,
      lastNameState,
      emailState,
      passwordState
    );

  return (
    <div className="container-fluid p-0 p-sm-1 mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row ">
              <div className="col-9">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    {props.addCustomerMode
                      ? getCustomerBoxToAdd()
                      : updateMode
                      ? getCustomerBoxToUpdate()
                      : getCustomerBox()}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <AdminBoxButtons
                  addMode={props.addCustomerMode}
                  updateMode={updateMode}
                  onClickSave={submit}
                  onClickUpdate={handleUpdateClicked}
                  onClickDelete={handleDeleteClicked}
                  idToDelete={props.id}
                ></AdminBoxButtons>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerBox;
