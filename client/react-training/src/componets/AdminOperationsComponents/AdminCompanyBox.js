import React from "react";
import "./AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { adminAddCompanyAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminAddCompanyAction";
import { adminUpdateCompanyAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";
import {
  adminResetAddMode,
  adminCompanyUpdateMode,
} from "../../actions/actions-for-ui/action-for-ui";
import AdminBoxInputContainerAdd from "./AdminBoxInputContainerAdd";
import AdminBoxInputContainerUpdate from "./AdminBoxInputContainerUpdate";
import AdminBoxButtons from "./AdminBoxButtons";
const AdminCompanyBox = (props) => {
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
  const companyName = useRef();
  const email = useRef();
  const password = useRef();

  const [idState, setIdState] = useState(props.id);
  const [companyNameState, setcompanyNameState] = useState(props.name);
  const [emailState, setEmailState] = useState(props.email);
  const [passwordState, setPasswordState] = useState(props.password);

  const submit = () => {
    if (!updateMode) {
      if (companyName.current.value === "") {
        document.getElementById("company-add-name").textContent =
          "please enter name";
      } else if (email.current.value === "") {
        document.getElementById("company-add-email").textContent =
          "please enter email";
      } else if (!email.current.value.includes("@")) {
        document.getElementById("company-add-email").textContent =
          "@ is missing ";
      } else if (password.current.value === "") {
        document.getElementById("company-add-password").textContent =
          "please enter password";
      } else {
        const companyObj = {
          name: companyName.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        dispatch(adminAddCompanyAction(companyObj));
        dispatch(adminResetAddMode());
      }
    } else {
      if (email.current.value === "") {
        document.getElementById(
          "company-update-email-" + props.id
        ).textContent = "please enter email";
      } else if (!email.current.value.includes("@")) {
        document.getElementById(
          "company-update-email-" + props.id
        ).textContent = "@ is missing ";
      } else if (password.current.value === "") {
        document.getElementById(
          "company-update-password-" + props.id
        ).textContent = "please enter password";
      } else {
        setEmailState(email.current.value);
        setPasswordState(password.current.value);
        const companyObj = {
          company_id: idState,
          name: companyNameState,
          email: email.current.value,
          password: password.current.value,
        };
        if (showOp.companyOp && searchMode) {
          dispatch({
            type: "UPDATE-FROM-SEARCH-RESULT-COMPANY-LIST",
            payload: {
              companyObj: companyObj,
            },
          });
        }
        dispatch(adminUpdateCompanyAction(companyObj));

        setUpdateMode(false);
      }
    }
  };

  const handleUpdateClicked = () => {
    dispatch(adminCompanyUpdateMode());

    setUpdateMode(true);
  };

  const handleDeleteClicked = (idToDelete) => {
    if (showOp.companyOp && searchMode) {
      dispatch({
        type: "DELETE-FROM-SEARCH-RESULT-COMPANY-LIST",
        payload: idToDelete,
      });
    }
    dispatch(adminDeleteCompanyAction(idToDelete));
  };

  return (
    <div className="container-fluid p-0 p-sm-1 mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row m-0 p-0 ">
              <div className="col-9">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    {props.addCompanyMode === true ? (
                      <AdminBoxInputContainerAdd
                        refTo={companyName}
                        label={"Name :"}
                        id="company-add-name"
                      ></AdminBoxInputContainerAdd>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-3 col-sm-12">
                            <span> Name: {companyNameState}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {props.addCompanyMode ? (
                      <AdminBoxInputContainerAdd
                        refTo={email}
                        label={"Email :"}
                        id="company-add-email"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Email: "}
                        onChangeFunc={setEmailState}
                        value={emailState}
                        refTo={email}
                        idPrefix={"company-update-email-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-3 col-sm-12">
                            <span>Email: {emailState}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {props.addCompanyMode ? (
                      <AdminBoxInputContainerAdd
                        refTo={password}
                        label={"Password :"}
                        id="company-add-password"
                      ></AdminBoxInputContainerAdd>
                    ) : updateMode ? (
                      <AdminBoxInputContainerUpdate
                        label={"Password: "}
                        onChangeFunc={setPasswordState}
                        value={passwordState}
                        refTo={password}
                        idPrefix={"company-update-password-"}
                        idSuffix={props.id}
                      ></AdminBoxInputContainerUpdate>
                    ) : (
                      <div className="container-fluid p-0 m-0">
                        <div className="row">
                          <div className="col-3 col-sm-12">
                            <span> Password: {passwordState}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-3 px-1 px-lg-2 ">
                <AdminBoxButtons
                  addCustomerMode={props.addCompanyMode}
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

export default AdminCompanyBox;
