import React from "react";

const OperationsButton = (props) => {
  return (
    <div>
      <div className="admin-main-op-badge ">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12 ">
              <div className="h3 op-font text-justify">{props.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsButton;
