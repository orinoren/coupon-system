import React from "react";
import "./NotFound.css";
import pageNotFoundImage from "../../images/pageNotFound.jpg";
import { useHistory } from "react-router";
const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="container-fluid vh-100 main-content-hight bg-success">
      <div className="row h-100 p-0 m-0 align-items-center text-center">
        <div className="container">
          <div className="row gy-5 gy-lg-0">
            <div className="col-12 order-2 order-lg-1 col-lg-6">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <img
                      className="img-not-found"
                      src={pageNotFoundImage}
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
                        <div className="h1">page not found...</div>
                      </div>
                      <div className="col-12 col-lg-5">
                        <div
                          onClick={() => history.push("/home")}
                          className="go-home-button text-center px-2 fs-2 fw-bolder"
                        >
                          Back to home
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

export default NotFoundPage;
