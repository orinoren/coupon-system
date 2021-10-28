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
  };

  const handleUpdateClicked = () => {
    dispatch(adminCompanyUpdateMode());

    setUpdateMode(true);
  };

  const handleDeleteClicked = () => {
    if (showOp.companyOp && searchMode) {
      dispatch({
        type: "DELETE-FROM-SEARCH-RESULT-COMPANY-LIST",
        payload: props.id,
      });

      dispatch(adminDeleteCompanyAction(idState));
    }
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row ">
              <div className="col-9">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    <div className="col-12 ">
                      {props.addCompanyMode === true ? (
                        <AdminBoxInputContainerAdd
                          refTo={companyName}
                          label={"Name :"}
                          id="company-add-name"
                        ></AdminBoxInputContainerAdd>
                      ) : (
                        <span> Name : {companyNameState}</span>
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
                          id={"company-update-email-" + props.id}
                        ></AdminBoxInputContainerUpdate>
                      ) : (
                        <div className="col-12 ">Email : {emailState}</div>
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
                          id={"company-update-password-" + props.id}
                        ></AdminBoxInputContainerUpdate>
                      ) : (
                        <div className="col-12 ">
                          Password : {passwordState}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3">
                <AdminBoxButtons
                  addCustomerMode={props.addCompanyMode}
                  updateMode={updateMode}
                  onClickSave={submit}
                  onClickUpdate={handleUpdateClicked}
                  onClickRemove={handleDeleteClicked}
                ></AdminBoxButtons>
                <div className="container-fluid  m-0 h-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyBox;
