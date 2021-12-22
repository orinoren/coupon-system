import React from "react";
import homePic from "../../images/tag.png";
import fotterPic from "../../images/grass.png";
import "./Home.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCouponsAction } from "../../actions/actions-for-global/getAllCouponsAction";
import { getAllCategoriesAction } from "../../actions/actions-for-global/getAllCategoriesAction";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.authReducer);

  const handleEnterAsGuestBtnClicked = () => {
    localStorage.removeItem("Jwt");
    localStorage.removeItem("Role");

    dispatch({
      type: "LOGIN-SUCCEED",
      payload: {
        token: "",
        role: "GUEST",
        username: "",
        isLogged: false,
      },
    });

    history.push("/main");
  };
  const handleLoginUserBtnClicked = () => {
    history.push("/login");
  };
  const handleGoToWebstieBtnClicked = () => {
    if (userDetails.role === "ADMIN") {
      history.push("/admin");
      return;
    }
    if (userDetails.role === "COMPANY") {
      history.push("/company");
      return;
    }
    if (userDetails.role === "CUSTOMER") {
      history.push("/main");
      return;
    }
  };

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllCouponsAction());
    return () => {};
  }, [dispatch]);
  return (
    <div className="container-fluid container-bg">
      <div className="row justify-content-end pt-1 pt-lg-5">
        <div className="col-12 col-md-8 col-lg-5 ">
          <h2 className="mb-2 px-0 px-md-4 ">
            My final project by
            <span className="text-warning"> orin oren </span>
          </h2>
        </div>
        <div className="col-md-4 col-lg-7 mt-1 mt-lg-3 justify-self-center ">
          <div className="row justify-content-center">
            {userDetails.isLogged ? (
              <button
                onClick={() => handleGoToWebstieBtnClicked()}
                className="btn home-login-btn 
              col-12 col-lg-2 
          "
                type="button"
              >
                Go to website
              </button>
            ) : (
              <div>
                <button
                  onClick={() => handleEnterAsGuestBtnClicked()}
                  className="btn home-login-btn col-12 col-lg-2 offset-lg-6"
                  type="button"
                >
                  Enter As Guest
                </button>
                <button
                  onClick={() => handleLoginUserBtnClicked()}
                  className="btn home-login-btn col-12  col-lg-2 offset-lg-1"
                  type="button"
                >
                  Login User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 px-5 col-12 mt-2 ">
          <p className="h5">
            Full stack project made with several technologies such as :
          </p>
          <p className="fw-bold fs-5">
            <span className="h5"> Server side : </span>
            <br />
            <span className="text-danger">Architecture </span>
            bulid as a MVC model to achive "separation of concerns".
            <br />
            <span className="text-danger">Jpa/Hibernate </span>
            for interaction with the database.
            <br />
            <span className="text-danger">JWT </span>autherization for rest api
            calls.
            <br />
            <span className="text-danger">MultiThreading </span>a daily job that
            runs every 24 hours and deleting expired coupons.
            <br />
            <span className="text-danger">MySQL </span>for storing the user data
            in the database.
          </p>
          <p className="fw-bold fs-5">
            <span className="h5"> Client side : </span> <br />
            <span className="text-danger">React </span>
            for single-page application.
            <br />
            <span className="text-danger">Redux </span>
            for state managment.
            <br />
            <span className="text-danger">Bootstrap </span>
            responsivence and design for the webstie .
            <br />
            <span className="text-danger">HTML, CSS , JAVASCRIPT </span>
          </p>
        </div>
        <div className="col-6 d-md-flex d-none justify-content-center  ">
          <img className="rotate w-50 mt-5" src={homePic} alt="" />
        </div>
      </div>
      <div className="d-inline d-md-none text-center">
        <div className="h1 pt-5">
          ORIN OREN <br /> RESPONSIVE WEBSITE
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 mt-3">
          <img className="w-100 " src={fotterPic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
