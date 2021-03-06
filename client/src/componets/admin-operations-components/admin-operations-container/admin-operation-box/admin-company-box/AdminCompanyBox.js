import React from "react";
import "../../../AdminOperations.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { adminAddCompanyAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminAddCompanyAction";
import AdminBoxButtons from "../../../admin-operations-container/admin-operation-box/AdminBoxButtons";
import { adminCompanyUpdateMode } from "../../../../../actions/actions-for-ui/action-for-ui";
import { useRef } from "react";
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

  const server_error_for_add_company = useRef(" ");
  const server_error_for_update_company = useRef(" ");
  const company_update_email_error_messege = useRef("");
  const company_update_password_error_messege = useRef("");
  const company_add_name_error_messege = useRef("");
  const company_add_email_error_messege = useRef("");
  const company_add_password_error_messege = useRef("");
  const isSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );
  const dispatch = useDispatch();

  const submit = () => {
    if (updateMode) {
      const isUpdateValid = companyValidationToUpdate(
        emailState,
        passwordState,
        company_update_email_error_messege,
        company_update_password_error_messege
      );
      if (isUpdateValid) {
        const companyObj = {
          company_id: props.id,
          name: props.name,
          email: emailState,
          password: passwordState,
        };
        dispatchUpdatedCompany(
          companyObj,
          isSearchMode,
          dispatch,
          setUpdateMode,
          server_error_for_update_company
        );
      }
      return;
    }
    const isAddValid = companyValidationToAdd(
      companyNameState,
      emailState,
      passwordState,
      company_add_name_error_messege,
      company_add_email_error_messege,
      company_add_password_error_messege
    );
    if (isAddValid) {
      const companyObj = {
        name: companyNameState,
        email: emailState,
        password: passwordState,
      };
      dispatch(adminAddCompanyAction(companyObj, server_error_for_add_company));
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
      setPasswordState,
      server_error_for_add_company,
      company_add_name_error_messege,
      company_add_email_error_messege,
      company_add_password_error_messege
    );

  const getCompanyBoxToUpdate = () => {
    return getCompanyBoxToUpdateFunc(
      props.name,
      emailState,
      setEmailState,
      passwordState,
      setPasswordState,
      props.id,
      server_error_for_update_company,
      company_update_email_error_messege,
      company_update_password_error_messege
    );
  };
  const getCompanyBox = () =>
    getCompanyBoxFunc(companyNameState, emailState, passwordState);

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
                  addMode={props.addCompanyMode}
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
