import AdminInputToAdd from "../../AdminInputToAdd";
import AdminInputToUpdate from "../../AdminInputToUpdate";
import { adminUpdateCompanyAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";

export const getCompanyBoxToAddFunc = (
  setNameState,
  setEmailState,
  setPasswordState
) => {
  return (
    <div>
      <AdminInputToAdd
        onChangeFunc={setNameState}
        label={"Name :"}
        id="company-add-name"
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setEmailState}
        label={"Email :"}
        id="company-add-email"
      ></AdminInputToAdd>

      <AdminInputToAdd
        onChangeFunc={setPasswordState}
        label={"Password :"}
        id="company-add-password"
      ></AdminInputToAdd>
    </div>
  );
};
export const getCompanyBoxToUpdateFunc = (
  companyNameState,
  emailState,
  setEmailState,
  id,
  passwordState,
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
      <AdminInputToUpdate
        label={"Email: "}
        onChangeFunc={setEmailState}
        value={emailState}
        idPrefix={"company-update-email-"}
        idSuffix={id}
      ></AdminInputToUpdate>

      <AdminInputToUpdate
        label={"Password: "}
        onChangeFunc={setPasswordState}
        value={passwordState}
        idPrefix={"company-update-password-"}
        idSuffix={id}
      ></AdminInputToUpdate>
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
  if (companyName === "") {
    document.getElementById("company-add-name").textContent =
      "please enter name";
    return false;
  }
  if (email === "") {
    document.getElementById("company-add-email").textContent =
      "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    document.getElementById("company-add-email").textContent = "@ is missing ";
    return false;
  }
  if (password.value === "") {
    document.getElementById("company-add-password").textContent =
      "please enter password";
    return false;
  }
  return true;
};
export const companyValidationToUpdate = (email, password, company_id) => {
  if (email === "") {
    document.getElementById("company-update-email-" + company_id).textContent =
      "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    document.getElementById("company-update-email-" + company_id).textContent =
      "@ is missing ";
    return false;
  }
  if (password === "") {
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
