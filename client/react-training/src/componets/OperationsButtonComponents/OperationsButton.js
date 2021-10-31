import React from "react";

const OperationsButton = (props) => {
  return (
    <div>
      <div className="admin-main-op-badge ">
        <div className="container p-0 p-md-1 h-100">
          <div className="row p-0 p-md-1 m-0 h-100 justify-content-center align-items-center">
            <div className="col-12 p-0 p-md-1 ">
              <div className="">{props.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsButton;
