import React from "react";
import "./AdminOperations.css";
const AdminBoxButtons = (props) => {
  return (
    <div className="container-fluid p-0 m-0 h-100">
      {props.addCustomerMode || props.updateMode ? (
        <div className="row  h-100  align-items-center m-0 p-0 ">
          <div
            onClick={() => props.onClickSave()}
            className="col-12 col-sm-7 text-center col-lg-3  admin-company-box-update-button "
          >
            Save
          </div>
        </div>
      ) : (
        <div className="row m-0 h-100 align-items-center">
          <div
            onClick={() => props.onClickUpdate()}
            className="col-12 col-sm-7 text-center col-lg-4 mx-lg-2 admin-company-box-update-button"
          >
            Edit
          </div>

          <div
            onClick={() => props.onClickDelete()}
            className="col-12 col-sm-7 col-lg-5 text-center  mx-lg-2 admin-company-box-remove-button"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBoxButtons;
