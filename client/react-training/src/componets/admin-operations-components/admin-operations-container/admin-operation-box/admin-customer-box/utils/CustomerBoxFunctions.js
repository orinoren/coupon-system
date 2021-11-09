import { adminUpdateCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminUpdateCustomerAction";
import { adminDeleteCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminDeleteCustomerAction";
import AdminBoxInputToAdd from "../../AdminBoxInputToAdd";
import AdminBoxInputToUpdate from "../../AdminBoxInputToUpdate";
export const customerValidationToAdd = (
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef
) => {
  if (firstNameRef.current.value === "") {
    document.getElementById("customer-add-first-name").textContent =
      "please enter first name";
    return false;
  }
  if (lastNameRef.current.value === "") {
    document.getElementById("customer-add-last-name").textContent =
      "please enter last name";
    return false;
  }
  if (emailRef.current.value === "") {
    document.getElementById("customer-add-email").textContent =
      "please enter email";
    return false;
  }
  if (!emailRef.current.value.includes("@")) {
    document.getElementById("customer-add-email").textContent = "@ is missing ";
    return false;
  }
  if (passwordRef.current.value === "") {
    document.getElementById("customer-add-password").textContent =
      "please enter password";
    return false;
  }

  return true;
};
export const customerValidationToUpdate = (
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  customer_id
) => {
  if (firstNameRef.current.value === "") {
    document.getElementById(
      "customer-update-first-name-" + customer_id
    ).textContent = "please enter first name";
    return false;
  }
  if (lastNameRef.current.value === "") {
    document.getElementById(
      "customer-update-last-name-" + customer_id
    ).textContent = "please enter last name";
    return false;
  }
  if (emailRef.current.value === "") {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "please enter email";
    return false;
  }
  if (!emailRef.current.value.includes("@")) {
    document.getElementById(
      "customer-update-email-" + customer_id
    ).textContent = "@ is missing ";
    return false;
  }
  if (passwordRef.current.value === "") {
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
