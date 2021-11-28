import AdminInputToAdd from "../../AdminInputToAdd";
import AdminInputToUpdate from "../../AdminInputToUpdate";
import { adminUpdateCompanyAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";

export const getCompanyBoxToAddFunc = (
  setNameState,
  setEmailState,
  setPasswordState,
  server_error_for_add_company,
  company_add_name_error_messege,
  company_add_email_error_messege,
  company_add_password_error_messege
) => {
  return (
    <div>
      <AdminInputToAdd
        onChangeFunc={setNameState}
        label={"Name :"}
        id="company-add-name"
        errorMessege={company_add_name_error_messege}
        serverErrorMessege={server_error_for_add_company}
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setEmailState}
        label={"Email :"}
        id="company-add-email"
        errorMessege={company_add_email_error_messege}
        serverErrorMessege={server_error_for_add_company}
      ></AdminInputToAdd>

      <AdminInputToAdd
        onChangeFunc={setPasswordState}
        label={"Password :"}
        id="company-add-password"
        errorMessege={company_add_password_error_messege}
        serverErrorMessege={server_error_for_add_company}
      ></AdminInputToAdd>
      <div
        ref={server_error_for_add_company}
        className="text-danger"
        id="server-error-for-add-company"
      ></div>
    </div>
  );
};
export const getCompanyBoxToUpdateFunc = (
  companyNameState,
  emailState,
  setEmailState,
  passwordState,
  setPasswordState,
  id,
  server_error_for_update_company,
  company_update_email_error_messege,
  company_update_password_error_messege
) => {
  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-3 col-sm-12">
            <span> Name: {companyNameState}</span>
          </div>
        </div>
      </div>
      <AdminInputToUpdate
        label={"Email: "}
        onChangeFunc={setEmailState}
        value={emailState}
        idPrefix={"company-update-email-"}
        idSuffix={id}
        serverErrorMessege={server_error_for_update_company}
        errorMessege={company_update_email_error_messege}
      ></AdminInputToUpdate>

      <AdminInputToUpdate
        label={"Password: "}
        onChangeFunc={setPasswordState}
        value={passwordState}
        idPrefix={"company-update-password-"}
        idSuffix={id}
        serverErrorMessege={server_error_for_update_company}
        errorMessege={company_update_password_error_messege}
      ></AdminInputToUpdate>
      <div
        ref={server_error_for_update_company}
        className="text-danger"
        id="server-error-for-update-company"
      ></div>
    </div>
  );
};
export const getCompanyBoxFunc = (
  companyNameState,
  emailState,
  passwordState
) => {
  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-3 col-sm-12">
            <span> Name: {companyNameState}</span>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-3 col-sm-12">
            <span>Email: {emailState}</span>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-3 col-sm-12">
            <span> Password: {passwordState}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export const companyValidationToAdd = (
  companyName,
  email,
  password,
  company_add_name_error_messege,
  company_add_email_error_messege,
  company_add_password_error_messege
) => {
  if (companyName === "" || companyName === undefined) {
    company_add_name_error_messege.current.textContent = "please enter name";
    return false;
  }
  if (email === "" || email === undefined) {
    company_add_email_error_messege.current.textContent = "please enter email";
    return false;
  }
  if (!email?.includes("@")) {
    company_add_email_error_messege.current.textContent = "@ is missing ";
    return false;
  }
  if (password === "" || password === undefined) {
    company_add_password_error_messege.current.textContent =
      "please enter password";
    return false;
  }
  return true;
};
export const companyValidationToUpdate = (
  email,
  password,
  company_update_email_error_messege,
  company_update_password_error_messege
) => {
  if (email === "") {
    company_update_email_error_messege.current.textContent =
      "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    company_update_email_error_messege.current.textContent = "@ is missing ";
    return false;
  }
  if (password === "") {
    company_update_password_error_messege.current.textContent =
      "please enter password";
    return false;
  }
  return true;
};
export const dispatchUpdatedCompany = (
  companyObj,
  isSearchMode,
  dispatch,
  setUpdateMode,
  server_error_for_update_company
) => {
  if (isSearchMode) {
    dispatch({
      type: "UPDATE-FROM-SEARCH-RESULT-COMPANY-LIST",
      payload: {
        companyObj: companyObj,
      },
    });
  }

  dispatch(
    adminUpdateCompanyAction(
      companyObj,
      setUpdateMode,
      server_error_for_update_company
    )
  );
};
export const dispatchDeletedCompany = (idToDelete, isSearchMode, dispatch) => {
  if (isSearchMode) {
    dispatch({
      type: "DELETE-FROM-SEARCH-RESULT-COMPANY-LIST",
      payload: idToDelete,
    });
  }
  dispatch(adminDeleteCompanyAction(idToDelete));
};
