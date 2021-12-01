import React from "react";
import { useHistory } from "react-router";
import unauthorizedImage from "../../images/unauthorized.png";
import "./Unauthorized.css";
const UnauthorizedPage = () => {
  const history = useHistory();
  return (
    <div className="container-fluid vh-100 main-content-hight bg-success">
      <div className="row h-100 align-items-center text-center">
        <div className="container">
          <div className="row gy-5 gy-lg-0">
            <div className="col-12 col-lg-6 order-2 order-lg-1 ">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <img
                      className="img-unauthorized"
                      src={unauthorizedImage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="container-fluid h-100">
                <div className="row h-100 gy-2 justify-content-center align-items-center">
                  <div className="container">
                    <div className="row gy-3 justify-content-center">
                      <div className="col-12">
                        <div className="h1">
                          This page needs a login details...
                        </div>
                      </div>
                      <div className="col-12 col-lg-5">
                        <div
                          onClick={() => history.push("/login")}
                          className="go-home-button px-2 text-center fs-2 fw-bolder"
                        >
                          Go to login
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
