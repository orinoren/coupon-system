import React from "react";
import "./AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { adminAddCustomerAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminAddCustomerAction";
import { adminDeleteCustomerAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminDeleteCustomerAction";
import AdminBoxInputContainerAdd from "./AdminBoxInputContainerAdd";
import AdminBoxInputContainerUpdate from "./AdminBoxInputContainerUpdate";
import AdminBoxButtons from "./AdminBoxButtons";
import {
  adminResetAddMode,
  adminCustomerUpdateMode,
} from "../../actions/actions-for-ui/action-for-ui";
import { adminUpdateCustomerAction } from "../../actions/actions-for-admin/actions-for-admin-for-customer/adminUpdateCustomerAction";
const AdminCustomerBox = (props) => {
  const boxKind = useSelector(
    (state) => state.uiRootReducer.adminOpBoxTypeReducer.typeOfBox
  );

  const showOp = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );
  const searchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );
  const [updateMode, setUpdateMode] = useState(false);
  const dispatch = useDispatch();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const [idState, setIdState] = useState(props.id);
  const [firstNameState, setFirstNameState] = useState(props.firstName);
  const [lastNameState, setLastNameState] = useState(props.lastName);
  const [emailState, setEmailState] = useState(props.email);
  const [passwordState, setPasswordState] = useState(props.password);

  const submit = () => {
    if (!updateMode) {
      if (firstName.current.value === "") {
        document.getElementById("customer-add-first-name").textContent =
          "please enter first name";
      } else if (lastName.current.value === "") {
        document.getElementById("customer-add-last-name").textContent =
          "please enter last name";
      } else if (email.current.value === "") {
        document.getElementById("customer-add-email").textContent =
          "please enter email";
      } else if (!email.current.value.includes("@")) {
        document.getElementById("customer-add-email").textContent =
          "@ is missing ";
      } else if (password.current.value === "") {
        document.getElementById("customer-add-password").textContent =
          "please enter password";
      } else {
        const customerObj = {
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        dispatch(adminAddCustomerAction(customerObj));
        dispatch(adminResetAddMode());
      }
    } else {
      if (firstName.current.value === "") {
        document.getElementById(
          "customer-update-first-name-" + props.id
        ).textContent = "please enter first name";
      } else if (lastName.current.value === "") {
        document.getElementById(
          "customer-update-last-name-" + props.id
        ).textContent = "please enter last name";
      } else if (email.current.value === "") {
        document.getElementById(
          "customer-update-email-" + props.id
        ).textContent = "please enter email";
      } else if (!email.current.value.includes("@")) {
        document.getElementById(
          "customer-update-email-" + props.id
        ).textContent = "@ is missing ";
      } else if (password.current.value === "") {
        document.getElementById(
          "customer-update-password-" + props.id
        ).textContent = "please enter password";
      } else {
        setFirstNameState(firstName.current.value);
        setLastNameState(lastName.current.value);
        setEmailState(email.current.value);
        setPasswordState(password.current.value);
        const customerObj = {
          id: idState,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        if (showOp.customerOp && searchMode) {
          dispatch({
            type: "UPDATE-FROM-SEARCH-RESULT-CUSTOMER-LIST",
            payload: {
              customerObj: customerObj,
            },
          });
        }
        dispatch(adminUpdateCustomerAction(customerObj));

        setUpdateMode(false);
      }
    }
  };

  const handleUpdateClicked = () => {
    dispatch(adminCustomerUpdateMode());

    setUpdateMode(true);
  };

  const handleDeleteClicked = () => {
    if (showOp.customerOp && searchMode) {
      dispatch({
        type: "DELETE-FROM-SEARCH-RESULT-CUSTOMER-LIST",
        payload: props.id,
      });
    }
    dispatch(adminDeleteCustomerAction(idState));
  };

  return (
    <div className="container-fluid p-0 p-sm-1 mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row ">
              <div className="col-9">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    {props.addCustomerMode === true ? (
                      <AdminBoxInputContainerAdd
                        refTo={firstName}
                        label={"First name :"}
                        id="customer-add-first-name"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"First name :"}
                        onChangeFunc={setFirstNameState}
                        value={firstNameState}
                        refTo={firstName}
                        idPrefix={"customer-update-first-name-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-12 ">
                            <span>First name: {firstNameState}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {props.addCustomerMode === true ? (
                      <AdminBoxInputContainerAdd
                        refTo={lastName}
                        label={"Last name :"}
                        id="customer-add-last-name"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Last name :"}
                        onChangeFunc={setLastNameState}
                        value={lastNameState}
                        refTo={lastName}
                        idPrefix={"customer-update-last-name-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-12 ">
                            <span>Last name: {lastNameState}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {props.addCustomerMode ? (
                      <AdminBoxInputContainerAdd
                        refTo={email}
                        label={"Email :"}
                        id="customer-add-email"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Email :"}
                        onChangeFunc={setEmailState}
                        value={emailState}
                        refTo={email}
                        idPrefix={"customer-update-email-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-12 ">
                            <span>Email: {emailState}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {props.addCustomerMode ? (
                      <AdminBoxInputContainerAdd
                        refTo={password}
                        label={"Password :"}
                        id="customer-add-password"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Password :"}
                        onChangeFunc={setPasswordState}
                        value={passwordState}
                        refTo={password}
                        idPrefix={"customer-update-password-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-12 ">
                            <span>Password: {passwordState}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <AdminBoxButtons
                  addCustomerMode={props.addCustomerMode}
                  updateMode={updateMode}
                  onClickSave={submit}
                  onClickUpdate={handleUpdateClicked}
                  onClickDelete={handleDeleteClicked}
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
