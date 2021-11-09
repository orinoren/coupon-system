import React from "react";
import "../../../AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { adminAddCompanyAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminAddCompanyAction";
import AdminBoxButtons from "../../../admin-operations-container/admin-operation-box/AdminBoxButtons";
import {
  adminResetAddMode,
  adminCompanyUpdateMode,
} from "../../../../../actions/actions-for-ui/action-for-ui";
import {
  companyValidationToAdd,
  companyValidationToUpdate,
  dispatchDeletedCompany,
  dispatchUpdatedCompany,
  getCompanyBoxFunc,
  getCompanyBoxToAddFunc,
  getCompanyBoxToUpdateFunc,
} from "./utils/CompanyBoxFunctions";
const AdminCompanyBox = (props) => {
  const [companyNameState, setCompanyNameState] = useState(props.name);
  const [emailState, setEmailState] = useState(props.email);
  const [passwordState, setPasswordState] = useState(props.password);
  const [updateMode, setUpdateMode] = useState(false);
  const dispatch = useDispatch();

  const isSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );

  const submit = () => {
    console.log(props?.id);
    console.log(companyNameState);
    console.log(emailState);
    console.log(passwordState);
    if (updateMode) {
      const isUpdateValid = companyValidationToUpdate(
        emailState,
        passwordState,
        props.id
      );
      if (isUpdateValid) {
        const companyObj = {
          company_id: props.id,
          name: props.name,
          email: emailState,
          password: passwordState,
        };
        dispatchUpdatedCompany(companyObj, isSearchMode, dispatch);
        setUpdateMode(false);
      }
    } else {
      const isAddValid = companyValidationToAdd(
        companyNameState,
        emailState,
        passwordState
      );
      if (isAddValid) {
        const companyObj = {
          name: companyNameState,
          email: emailState,
          password: passwordState,
        };
        dispatch(adminAddCompanyAction(companyObj));
        dispatch(adminResetAddMode());
      }
    }
  };

  const handleUpdateClicked = () => {
    dispatch(adminCompanyUpdateMode());
    setUpdateMode(true);
  };

  const handleDeleteClicked = (idToDelete) => {
    dispatchDeletedCompany(idToDelete, isSearchMode, dispatch);
  };
  const getCompanyBoxToAdd = () =>
    getCompanyBoxToAddFunc(
      setCompanyNameState,
      setEmailState,
      setPasswordState
    );

  const getCompanyBoxToUpdate = () => {
    return getCompanyBoxToUpdateFunc(
      props.name,
      emailState,
      setEmailState,
      props.id,
      passwordState,
      setPasswordState
    );
  };
  const getCompanyBox = () =>
    getCompanyBoxFunc(props.name, emailState, passwordState);

  return (
    <div className="container-fluid p-0 p-sm-1 mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
          <div className="container-fluid p-0 admin-op-main-container mt-0">
            <div className="row m-0 p-0 ">
              <div className="col-9">
                <div className="container-fluid p-3">
                  <div className="row g-1 align-items-between">
                    {props.addCompanyMode
                      ? getCompanyBoxToAdd()
                      : updateMode
                      ? getCompanyBoxToUpdate()
                      : getCompanyBox()}
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
