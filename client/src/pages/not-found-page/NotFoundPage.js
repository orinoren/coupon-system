import React from "react";
import "./NotFound.css";
import pageNotFoundImage from "../../images/pageNotFound.jpg";
import { useHistory } from "react-router";
const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="container-fluid main-content-hight bg-success">
      <div className="row h-100 p-0 m-0 align-items-center text-center">
        <div className="col-6">
          <div>
            <img src={pageNotFoundImage} alt="" />
          </div>
        </div>
        <div className="col-6 pb-5 mb-5  ">
          <div className="conatiner">
            <div className="row gy-4 justify-content-center">
              <div className="col-12">
                <div className="h1">404</div>
              </div>
              <div className="col-12">
                <div className="h2">page not found...</div>
              </div>
              <div className="col-4">
                <div
                  onClick={() => history.push("/home")}
                  className="go-home-button text-center fs-2 fw-bolder"
                >
                  Back to home
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
