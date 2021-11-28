import { adminUpdateCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminUpdateCustomerAction";
import { adminDeleteCustomerAction } from "../../../../../../actions/actions-for-admin/actions-for-admin-for-customer/adminDeleteCustomerAction";
import AdminInputToAdd from "../../AdminInputToAdd";
import AdminInputToUpdate from "../../AdminInputToUpdate";
export const customerValidationToAdd = (
  firstName,
  lastName,
  email,
  password,
  customer_add_first_name_error_messege,
  customer_add_last_name_error_messege,
  customer_add_email_error_messege,
  customer_add_password_error_messege
) => {
  if (firstName === "" || firstName === undefined) {
    customer_add_first_name_error_messege.current.textContent =
      "please enter first name";
    return false;
  }
  if (lastName === "" || lastName === undefined) {
    customer_add_last_name_error_messege.current.textContent =
      "please enter last name";
    return false;
  }
  if (email === "" || email === undefined) {
    customer_add_email_error_messege.current.textContent = "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    customer_add_first_name_error_messege.current.textContent = "@ is missing ";
    return false;
  }
  if (password === "" || password === undefined) {
    customer_add_password_error_messege.current.textContent =
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
  customer_id,
  customer_update_first_name_error_messege,
  customer_update_last_name_error_messege,
  customer_update_email_error_messege,
  customer_update_password_error_messege
) => {
  if (firstName === "") {
    customer_update_first_name_error_messege.current.textContent =
      "please enter first name";
    return false;
  }
  if (lastName === "") {
    customer_update_last_name_error_messege.current.textContent =
      "please enter last name";
    return false;
  }
  if (email === "") {
    customer_update_email_error_messege.current.textContent =
      "please enter email";
    return false;
  }
  if (!email.includes("@")) {
    customer_update_email_error_messege.current.textContent = "@ is missing ";
    return false;
  }
  if (password === "") {
    customer_update_password_error_messege.current.textContent =
      "please enter password";
    return false;
  }
  return true;
};
export const dispatchUpdatedCustomer = (
  customerObj,
  isSearchMode,
  dispatch,
  setUpdateMode,
  server_error_for_update_customer
) => {
  if (isSearchMode) {
    dispatch({
      type: "UPDATE-FROM-SEARCH-RESULT-CUSTOMER-LIST",
      payload: {
        customerObj: customerObj,
      },
    });
  }
  dispatch(
    adminUpdateCustomerAction(
      customerObj,
      setUpdateMode,
      server_error_for_update_customer
    )
  );
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
  setPasswordState,
  server_error_for_add_customer,
  customer_add_first_name_error_messege,
  customer_add_last_name_error_messege,
  customer_add_email_error_messege,
  customer_add_password_error_messege
) => {
  return (
    <div>
      <AdminInputToAdd
        onChangeFunc={setFirstNameState}
        label={"First name :"}
        id="customer-add-first-name"
        serverErrorForCustomer={server_error_for_add_customer}
        errorMessege={customer_add_first_name_error_messege}
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setLastNameState}
        label={"Last name :"}
        id="customer-add-last-name"
        serverErrorForCustomer={server_error_for_add_customer}
        errorMessege={customer_add_last_name_error_messege}
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setEmailState}
        label={"Email :"}
        id="customer-add-email"
        serverErrorForCustomer={server_error_for_add_customer}
        errorMessege={customer_add_email_error_messege}
      ></AdminInputToAdd>
      <AdminInputToAdd
        onChangeFunc={setPasswordState}
        label={"Password :"}
        id="customer-add-password"
        serverErrorForCustomer={server_error_for_add_customer}
        errorMessege={customer_add_password_error_messege}
      ></AdminInputToAdd>
      <div
        ref={server_error_for_add_customer}
        className="text-danger"
        id="server-error-for-add-customer"
      ></div>
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
  id,
  server_error_for_update_customer,
  customer_update_first_name_error_messege,
  customer_update_last_name_error_messege,
  customer_update_email_error_messege,
  customer_update_password_error_messege
) => {
  return (
    <div>
      <AdminInputToUpdate
        label={"First name :"}
        onChangeFunc={setFirstNameState}
        value={firstNameState}
        idPrefix={"customer-update-first-name-"}
        idSuffix={id}
        serverError={server_error_for_update_customer}
        errorMessege={customer_update_first_name_error_messege}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Last name :"}
        onChangeFunc={setLastNameState}
        value={lastNameState}
        idPrefix={"customer-update-last-name-"}
        idSuffix={id}
        serverError={server_error_for_update_customer}
        errorMessege={customer_update_last_name_error_messege}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Email :"}
        onChangeFunc={setEmailState}
        value={emailState}
        idPrefix={"customer-update-email-"}
        idSuffix={id}
        serverError={server_error_for_update_customer}
        errorMessege={customer_update_email_error_messege}
      ></AdminInputToUpdate>
      <AdminInputToUpdate
        label={"Password :"}
        onChangeFunc={setPasswordState}
        value={passwordState}
        idPrefix={"customer-update-password-"}
        idSuffix={id}
        serverError={server_error_for_update_customer}
        errorMessege={customer_update_password_error_messege}
      ></AdminInputToUpdate>
      <div
        ref={server_error_for_update_customer}
        className="text-danger"
        id="server-error-for-update-customer"
      ></div>
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
