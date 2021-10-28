import React from "react";

const AdminBoxButtons = (props) => {
  return (
    <div className="container-fluid  m-0 h-100">
      {props.addCustomerMode || props.updateMode ? (
        <div className="row  h-100 justify-content-end align-items-center">
          <div
            onClick={() => props.onClickSave()}
            className="col-12 col-sm-7 text-center col-lg-3  admin-company-box-update-button "
          >
            Save
          </div>
        </div>
      ) : (
        <div className="row  h-100 justify-content-end align-items-center">
          <div
            onClick={() => props.onClickUpdate()}
            className="col-12 col-sm-7 text-center col-lg-4 admin-company-box-update-button"
          >
            Edit
          </div>

          <div
            onClick={() => props.onClickDelete()}
            className="col-12 col-sm-7 text-center col-lg-4 admin-company-box-remove-button"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBoxButtons;
