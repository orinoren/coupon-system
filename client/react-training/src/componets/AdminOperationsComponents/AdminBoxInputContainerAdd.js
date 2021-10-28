import React from "react";
import "./AdminOperations.css";
const AdminBoxInputContainerAdd = (props) => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-3">
          <label htmlFor="fname">{props.label}</label>
        </div>
        <div className="col-5 p-0">
          <input
            onFocus={() => {
              document.getElementById("company-add-name").textContent = "";
              document.getElementById("company-add-email").textContent = "";
              document.getElementById("company-add-password").textContent = "";
            }}
            ref={props.refTo}
            className=""
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
          />
        </div>
        <div className="col-4 p-0">
          <span id={props.id} className="error-messege-for-admin text-danger">
            error
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputContainerAdd;
