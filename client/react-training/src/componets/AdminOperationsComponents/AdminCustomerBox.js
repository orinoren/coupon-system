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
      const customerObj = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      dispatch(adminAddCustomerAction(customerObj));
      dispatch(adminResetAddMode());
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
    <div className="container-fluid mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row ">
              <div className="col-8">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    {props.addCustomerMode === true ? (
                      <AdminBoxInputContainerAdd
                        ref={firstName}
                        label={"First name :"}
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"First name :"}
                        onChangeFunc={setFirstNameState}
                        value={firstNameState}
                        refTo={firstName}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="col-12">
                        First name : {firstNameState}
                      </div>
                    )}

                    {props.addCustomerMode === true ? (
                      <AdminBoxInputContainerAdd
                        ref={lastName}
                        label={"Last name :"}
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Last name :"}
                        onChangeFunc={setLastNameState}
                        value={lastNameState}
                        refTo={lastName}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="col-12 ">LastName : {lastNameState}</div>
                    )}
                    {props.addCustomerMode ? (
                      <AdminBoxInputContainerAdd
                        ref={email}
                        label={"Email :"}
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Email :"}
                        onChangeFunc={setEmailState}
                        value={emailState}
                        refTo={email}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="col-12 ">Email : {emailState}</div>
                    )}
                    {props.addCustomerMode ? (
                      <AdminBoxInputContainerAdd
                        ref={password}
                        label={"Password :"}
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Password :"}
                        onChangeFunc={setPasswordState}
                        value={passwordState}
                        refTo={password}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="col-12 ">Password : {passwordState}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <AdminBoxButtons
                  addCustomerMode={props.addCustomerMode}
                  updateMode={updateMode}
                  onClickSave={submit}
                  onClickUpdate={handleUpdateClicked}
                  onClickRemove={handleDeleteClicked}
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
