import React from "react";
import "./AdminOperations.css";
import { useSelector } from "react-redux";
const AdminBoxInputContainerAdd = (props) => {
  const showOp = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );
  const handleOnFocusInput = () => {
    if (showOp.companyOp) {
      document.getElementById("company-add-name").textContent = "";
      document.getElementById("company-add-email").textContent = "";
      document.getElementById("company-add-password").textContent = "";
    } else {
      document.getElementById("customer-add-first-name").textContent = "";
      document.getElementById("customer-add-last-name").textContent = "";
      document.getElementById("customer-add-email").textContent = "";
      document.getElementById("customer-add-password").textContent = "";
    }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-3">
          <label htmlFor="fname">{props.label}</label>
        </div>
        <div className="col-5 p-0">
          <input
            onFocus={() => handleOnFocusInput()}
            ref={props.refTo}
            className=""
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
          />
        </div>
        <div className="col-4 p-0">
          <span
            id={props.id}
            className="error-messege-for-admin text-danger"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputContainerAdd;
