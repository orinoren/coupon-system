import React from "react";
import "../../../AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { adminAddCustomerAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminAddCustomerAction";
import AdminBoxButtons from "../AdminBoxButtons";
import {
  adminResetAddMode,
  adminCustomerUpdateMode,
} from "../../../../../actions/actions-for-ui/action-for-ui";
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
        props.id
      );
      if (isUpdateValid) {
        const customerObj = {
          id: props.id,
          first_name: firstNameState,
          last_name: lastNameState,
          email: emailState,
          password: passwordState,
        };
        dispatchUpdatedCustomer(customerObj, isSearchMode, dispatch);
        setUpdateMode(false);
      }
      return;
    }
    const isAddValid = customerValidationToAdd(
      firstNameState,
      lastNameState,
      emailState,
      passwordState
    );
    if (isAddValid) {
      const customerObj = {
        first_name: firstNameState,
        last_name: lastNameState,
        email: emailState,
        password: passwordState,
      };
      dispatch(adminAddCustomerAction(customerObj));
      dispatch(adminResetAddMode());
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
      setPasswordState
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
      props.id
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
