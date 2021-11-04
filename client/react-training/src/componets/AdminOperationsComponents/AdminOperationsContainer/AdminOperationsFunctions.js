import AdminCustomerBox from "../AdminOperationsContainer/AdminOperatisonBox/AdminCustomerBox";
import AdminCompanyBox from "../AdminOperationsContainer/AdminOperatisonBox/AdminCompanyBox";
import AdminBoxInputToAdd from "./AdminOperatisonBox/AdminBoxInputToAdd";
import AdminBoxInputToUpdate from "./AdminOperatisonBox/AdminBoxInputToUpdate";
import { adminUpdateCompanyAction } from "../../../actions/actions-for-admin/actions-for-admin-for-company/adminUpdateCompanyAction";
import { adminDeleteCompanyAction } from "../../../actions/actions-for-admin/actions-for-admin-for-company/adminDeleteCompanyAction";
import { adminUpdateCustomerAction } from "../../../actions/actions-for-admin/actions-for-admin-for-customer/adminUpdateCustomerAction";
import { adminDeleteCustomerAction } from "../../../actions/actions-for-admin/actions-for-admin-for-customer/adminDeleteCustomerAction";
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
export const customerValidationToAdd = (
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef
) => {
  let isValid = true;
  if (firstNameRef.current.value === "") {
    document.getElementById("customer-add-first-name").textContent =
      "please enter first name";
    isValid = false;
  } else if (lastNameRef.current.value === "") {
    document.getElementById("customer-add-last-name").textContent =
      "please enter last name";
    isValid = false;
  } else if (emailRef.current.value === "") {
    document.getElementById("customer-add-email").textContent =
      "please enter email";
    isValid = false;
  } else if (!emailRef.current.value.includes("@")) {
    document.getElementById("customer-add-email").textContent = "@ is missing ";
    isValid = false;
  } else if (passwordRef.current.value === "") {
    document.getElementById("customer-add-password").textContent =
      "please enter password";
    isValid = false;
  }
  return isValid;
};
export const customerValidationToUpdate = (
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  customer_id
) => {
  let isValid = true;
  if (firstNameRef.current.value === "") {
    document.getElementById(
      "customer-update-first-name-" + customer_id
    ).textContent = "please enter first name";
    isValid = false;
  } else if (lastNameRef.current.value === "") {
    document.getElementById(
      "customer-update-last-name-" + customer_id
    ).textContent = "please enter last name";
    isValid = false;
  } else if (emailRef.current.value === "") {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "please enter email";
    isValid = false;
  } else if (!emailRef.current.value.includes("@")) {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "@ is missing ";
    isValid = false;
  } else if (passwordRef.current.value === "") {
    document.getElementById(
      "customer-update-password-" + customer_id
    ).textContent = "please enter password";
    isValid = false;
  }
  return isValid;
};
export const dispatchUpdatedCustomer = (
  customerObj,
  isSearchMode,
  dispatch
) => {
  if (isSearchMode) {
    dispatch({
      type: "UPDATE-FROM-SEARCH-RESULT-CUSTOMER-LIST",
      payload: {
        customerObj: customerObj,
      },
    });
  }
  dispatch(adminUpdateCustomerAction(customerObj));
};
export const dispatchDeletedCustomer = (idToDelete, isSearchMode, dispatch) => {
  if (isSearchMode) {
    dispatch({
      type: "DELETE-FROM-SEARCH-RESULT-CUSTOMER-LIST",
      payload: idToDelete,
    });
  }
  dispatch(adminDeleteCustomerAction(idToDelete));
};
export const getCustomerBoxToAddFunc = (
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef
) => {
  return (
    <div>
      <AdminBoxInputToAdd
        refTo={firstNameRef}
        label={"First name :"}
        id="customer-add-first-name"
      ></AdminBoxInputToAdd>
      <AdminBoxInputToAdd
        refTo={lastNameRef}
        label={"Last name :"}
        id="customer-add-last-name"
      ></AdminBoxInputToAdd>
      <AdminBoxInputToAdd
        refTo={emailRef}
        label={"Email :"}
        id="customer-add-email"
      ></AdminBoxInputToAdd>
      <AdminBoxInputToAdd
        refTo={passwordRef}
        label={"Password :"}
        id="customer-add-password"
      ></AdminBoxInputToAdd>
    </div>
  );
};
export const getCustomerBoxToUpdateFunc = (
  setFirstNameState,
  firstNameState,
  firstNameRef,
  id,
  setLastNameState,
  lastNameState,
  lastNameRef,
  setEmailState,
  emailState,
  emailRef,
  setPasswordState,
  passwordState,
  passwordRef
) => {
  return (
    <div>
      <AdminBoxInputToUpdate
        label={"First name :"}
        onChangeFunc={setFirstNameState}
        value={firstNameState}
        refTo={firstNameRef}
        idPrefix={"customer-update-first-name-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>
      <AdminBoxInputToUpdate
        label={"Last name :"}
        onChangeFunc={setLastNameState}
        value={lastNameState}
        refTo={lastNameRef}
        idPrefix={"customer-update-last-name-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>
      <AdminBoxInputToUpdate
        label={"Email :"}
        onChangeFunc={setEmailState}
        value={emailState}
        refTo={emailRef}
        idPrefix={"customer-update-email-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>
      <AdminBoxInputToUpdate
        label={"Password :"}
        onChangeFunc={setPasswordState}
        value={passwordState}
        refTo={passwordRef}
        idPrefix={"customer-update-password-"}
        idSuffix={id}
      ></AdminBoxInputToUpdate>
    </div>
  );
};
export const getCustomerBoxFunc = (
  firstNameState,
  lastNameState,
  emailState,
  passwordState
) => {
  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-12 ">
            <span>First name: {firstNameState}</span>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-12 ">
            <span>Last name: {lastNameState}</span>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-12 ">
            <span>Email: {emailState}</span>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-12 ">
            <span>Password: {passwordState}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
