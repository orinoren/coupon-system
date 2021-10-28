import React from "react";

const AdminBoxInputContainerUpdate = (props) => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-3">
          <label htmlFor="fname">{props.label}</label>
        </div>
        <div className="col-5 p-0">
          <input
            onChange={(e) => {
              props.onChangeFunc(e.target.value);
            }}
            value={props.value}
            ref={props.refTo}
            className=""
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
          />
        </div>
        <div className="col-4 p-0">
          <span className="text-danger">error</span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputContainerUpdate;
