import { adminUpdateCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminUpdateCustomerAction";
import { adminDeleteCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminDeleteCustomerAction";
import AdminInputToAdd from "../../AdminInputToAdd";
import AdminInputToUpdate from "../../AdminInputToUpdate";
export const customerValidationToAdd = (
  firstName,
  lastName,
  email,
  password
) => {
  if (firstName === "") {
    document.getElementById("customer-add-first-name").textContent =
      "please enter first name";
    return false;
  }
  if (lastName === "") {
    document.getElementById("customer-add-last-name").textContent =
      "please enter last name";
    return false;
  }
  if (email === "") {
    document.getElementById("customer-add-email").textContent =
      "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    document.getElementById("customer-add-email").textContent = "@ is missing ";
    return false;
  }
  if (password === "") {
    document.getElementById("customer-add-password").textContent =
      "please enter password";
    return false;
  }

  return true;
};
export const customerValidationToUpdate = (
  firstName,
  lastName,
  email,
  password,
  customer_id
) => {
  if (firstName === "") {
    document.getElementById(
      "customer-update-first-name-" + customer_id
    ).textContent = "please enter first name";
    return false;
  }
  if (lastName === "") {
    document.getElementById(
      "customer-update-last-name-" + customer_id
    ).textContent = "please enter last name";
    return false;
  }
  if (email === "") {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "@ is missing ";
    return false;
  }
  if (password === "") {
    document.getElementById(
      "customer-update-password-" + customer_id
    ).textContent = "please enter password";
    return false;
  }
  return true;
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
  setFirstNameState,
  setLastNameState,
  setEmailState,
  setPasswordState
) => {
  return (
    <div>
      <AdminInputToAdd
        onChangeFunc={setFirstNameState}
        label={"First name :"}
        id="customer-add-first-name"
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setLastNameState}
        label={"Last name :"}
        id="customer-add-last-name"
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setEmailState}
        label={"Email :"}
        id="customer-add-email"
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setPasswordState}
        label={"Password :"}
        id="customer-add-password"
      ></AdminInputToAdd>
    </div>
  );
};
export const getCustomerBoxToUpdateFunc = (
  setFirstNameState,
  firstNameState,
  setLastNameState,
  lastNameState,
  setEmailState,
  emailState,
  setPasswordState,
  passwordState,
  id
) => {
  return (
    <div>
      <AdminInputToUpdate
        label={"First name :"}
        onChangeFunc={setFirstNameState}
        value={firstNameState}
        idPrefix={"customer-update-first-name-"}
        idSuffix={id}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Last name :"}
        onChangeFunc={setLastNameState}
        value={lastNameState}
        idPrefix={"customer-update-last-name-"}
        idSuffix={id}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Email :"}
        onChangeFunc={setEmailState}
        value={emailState}
        idPrefix={"customer-update-email-"}
        idSuffix={id}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Password :"}
        onChangeFunc={setPasswordState}
        value={passwordState}
        idPrefix={"customer-update-password-"}
        idSuffix={id}
      ></AdminInputToUpdate>
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
