import AdminBoxInputToAdd from "../../AdminBoxInputToAdd";
import AdminBoxInputToUpdate from "../../AdminBoxInputToUpdate";
import { adminUpdateCompanyAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";

export const getCompanyBoxToAddFunc = (companyName, emailRef, passwordRef) => {
  return (
    <div>
      <AdminBoxInputToAdd
        refTo={companyName}
        label={"Name :"}
        id="company-add-name"
      ></AdminBoxInputToAdd>
      <AdminBoxInputToAdd
        refTo={emailRef}
        label={"Email :"}
        id="company-add-email"
      ></AdminBoxInputToAdd>

      <AdminBoxInputToAdd
        refTo={passwordRef}
        label={"Password :"}
        id="company-add-password"
      ></AdminBoxInputToAdd>
    </div>
  );
};
export const getCompanyBoxToUpdateFunc = (
  companyNameState,
  emailState,
  emailRef,
  setEmailState,
  id,
  passwordState,
  passwordRef,
  setPasswordState
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
      <AdminBoxInputToUpdate
        label={"Email: "}
        onChangeFunc={setEmailState}
        value={emailState}
        refTo={emailRef}
        idPrefix={"company-update-email-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>

      <AdminBoxInputToUpdate
        label={"Password: "}
        onChangeFunc={setPasswordState}
        value={passwordState}
        refTo={passwordRef}
        idPrefix={"company-update-password-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>
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
export const companyValidationToAdd = (companyName, email, password) => {
  if (companyName.current.value === "") {
    document.getElementById("company-add-name").textContent =
      "please enter name";
    return false;
  }
  if (email.current.value === "") {
    document.getElementById("company-add-email").textContent =
      "please enter email";
    return false;
  }
  if (!email.current.value.includes("@")) {
    document.getElementById("company-add-email").textContent = "@ is missing ";
    return false;
  }
  if (password.current.value === "") {
    document.getElementById("company-add-password").textContent =
      "please enter password";
    return false;
  }
  return true;
};
export const companyValidationToUpdate = (email, password, company_id) => {
  if (email.current.value === "") {
    document.getElementById("company-update-email-" + company_id).textContent =
      "please enter email";
    return false;
  }
  if (!email.current.value.includes("@")) {
    document.getElementById("company-update-email-" + company_id).textContent =
      "@ is missing ";
    return false;
  }
  if (password.current.value === "") {
    document.getElementById(
      "company-update-password-" + company_id
    ).textContent = "please enter password";
    return false;
  }
  return true;
};
export const dispatchUpdatedCompany = (companyObj, isSearchMode, dispatch) => {
  if (isSearchMode) {
    console.log("in search mode");
    dispatch({
      type: "UPDATE-FROM-SEARCH-RESULT-COMPANY-LIST",
      payload: {
        companyObj: companyObj,
      },
    });
  }
  console.log("update");
  dispatch(adminUpdateCompanyAction(companyObj));
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
