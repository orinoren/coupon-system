import AdminCustomerBox from "./AdminCustomerBox";
import AdminCompanyBox from "./AdminCompanyBox";
import AdminBoxInputContainerAdd from "./AdminBoxInputContainerAdd";
import AdminBoxInputContainerUpdate from "./AdminBoxInputContainerUpdate";
import { adminUpdateCompanyAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";
export const getAllCompaniesBoxesFunc = (
  isSearchMode,
  allCompaniesSearchResult,
  allCompanies
) => {
  if (isSearchMode) {
    return allCompaniesSearchResult?.map((company) => {
      return (
        <AdminCompanyBox
          key={company.company_id}
          id={company.company_id}
          name={company.name}
          email={company.email}
          password={company.password}
        />
      );
    });
  } else {
    return allCompanies.map((company) => {
      return (
        <AdminCompanyBox
          key={company.company_id}
          id={company.company_id}
          name={company.name}
          email={company.email}
          password={company.password}
        />
      );
    });
  }
};
export const getAllCustomersBoxesFunc = (
  isSearchMode,
  allCustomerSearchResult,
  allCustomers
) => {
  if (isSearchMode) {
    return allCustomerSearchResult?.map((customer) => {
      return (
        <AdminCustomerBox
          key={customer.id}
          id={customer.id}
          firstName={customer.first_name}
          lastName={customer.last_name}
          email={customer.email}
          password={customer.password}
        />
      );
    });
  } else {
    return allCustomers.map((customer) => {
      return (
        <AdminCustomerBox
          key={customer.id}
          id={customer.id}
          firstName={customer.first_name}
          lastName={customer.last_name}
          email={customer.email}
          password={customer.password}
        />
      );
    });
  }
};
export const getCompanyBoxToAddFunc = (companyName, emailRef, passwordRef) => {
  return (
    <div>
      <AdminBoxInputContainerAdd
        refTo={companyName}
        label={"Name :"}
        id="company-add-name"
      ></AdminBoxInputContainerAdd>
      <AdminBoxInputContainerAdd
        refTo={emailRef}
        label={"Email :"}
        id="company-add-email"
      ></AdminBoxInputContainerAdd>

      <AdminBoxInputContainerAdd
        refTo={passwordRef}
        label={"Password :"}
        id="company-add-password"
      ></AdminBoxInputContainerAdd>
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
      <AdminBoxInputContainerUpdate
        label={"Email: "}
        onChangeFunc={setEmailState}
        value={emailState}
        refTo={emailRef}
        idPrefix={"company-update-email-"}
        idSuffix={id}
      ></AdminBoxInputContainerUpdate>

      <AdminBoxInputContainerUpdate
        label={"Password: "}
        onChangeFunc={setPasswordState}
        value={passwordState}
        refTo={passwordRef}
        idPrefix={"company-update-password-"}
        idSuffix={id}
      ></AdminBoxInputContainerUpdate>
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
  let isValid = true;
  if (companyName.current.value === "") {
    document.getElementById("company-add-name").textContent =
      "please enter name";
    isValid = false;
  } else if (email.current.value === "") {
    document.getElementById("company-add-email").textContent =
      "please enter email";
    isValid = false;
  } else if (!email.current.value.includes("@")) {
    document.getElementById("company-add-email").textContent = "@ is missing ";
    isValid = false;
  } else if (password.current.value === "") {
    document.getElementById("company-add-password").textContent =
      "please enter password";
    isValid = false;
  }
  return isValid;
};
export const companyValidationToUpdate = (email, password, company_id) => {
  let isValid = true;
  if (email.current.value === "") {
    document.getElementById("company-update-email-" + company_id).textContent =
      "please enter email";
    isValid = false;
  } else if (!email.current.value.includes("@")) {
    document.getElementById("company-update-email-" + company_id).textContent =
      "@ is missing ";
    isValid = false;
  } else if (password.current.value === "") {
    document.getElementById(
      "company-update-password-" + company_id
    ).textContent = "please enter password";
    isValid = false;
  }
  return isValid;
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
