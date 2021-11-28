import React from "react";
const AdminBoxInputToUpdate = (props) => {
  const handleOnFocusInput = () => {
    props.serverErrorMessege.current.textContent = "";
    props.errorMessege.current.textContent = "";
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
            ref={props.errorMessege}
            id={props.idPrefix + props.idSuffix}
            className="text-danger"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputToUpdate;
