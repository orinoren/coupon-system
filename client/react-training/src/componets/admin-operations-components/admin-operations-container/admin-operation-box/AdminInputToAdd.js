import React, { useRef } from "react";
import "../../AdminOperations.css";
import { useSelector } from "react-redux";
const AdminBoxInputToAdd = (props) => {
  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const errorMsg = useRef();

  const handleOnFocusInput = () => {
    if (showOperationsFor.companyOp) {
      errorMsg.current.textContent = "";
      return;
    }
    errorMsg.current.textContent = "";
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="fname">{props.label}</label>
        </div>
        <div className="col-5 my-2 my-sm-0">
          <input
            onFocus={() => handleOnFocusInput()}
            onChange={(e) => props.onChangeFunc(e.target.value)}
            className=""
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
          />
        </div>
        <div className="col-12 col-md-4 p-0">
          <span
            ref={errorMsg}
            id={props.id}
            className="error-messege-for-admin text-danger"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default AdminBoxInputToAdd;
