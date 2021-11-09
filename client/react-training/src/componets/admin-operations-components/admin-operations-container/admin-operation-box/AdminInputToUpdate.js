import React from "react";
import { useSelector } from "react-redux";
const AdminBoxInputToUpdate = (props) => {
  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );
  const handleOnFocusInput = () => {
    if (showOperationsFor.companyOp) {
      document.getElementById(
        "company-update-email-" + props.idSuffix
      ).textContent = "";
      document.getElementById(
        "company-update-password-" + props.idSuffix
      ).textContent = "";
      return;
    }
    document.getElementById(
      "customer-update-first-name-" + props.idSuffix
    ).textContent = "";
    document.getElementById(
      "customer-update-last-name-" + props.idSuffix
    ).textContent = "";
    document.getElementById(
      "customer-update-email-" + props.idSuffix
    ).textContent = "";
    document.getElementById(
      "customer-update-password-" + props.idSuffix
    ).textContent = "";
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="fname">{props.label}</label>
        </div>
        <div className="col-5 p-0 my-2 my-sm-0">
          <input
            onChange={(e) => {
              props.onChangeFunc(e.target.value);
            }}
            onFocus={() => handleOnFocusInput()}
            value={props.value}
            className=""
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
          />
        </div>
        <div className="col-12 col-md-4 p-0">
          <span
            id={props.idPrefix + props.idSuffix}
            className="text-danger"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputToUpdate;
