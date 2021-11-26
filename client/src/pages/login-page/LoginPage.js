import React, { useRef } from "react";
import "./LoginPage.css";
import homePic from "../../images/tag.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import {
  resetSearchModeAction,
  resetUserModeAction,
} from "../../actions/actions-for-ui/action-for-ui";
import CompanyEmailPassList from "./CompanyEmailPassList";
import CustomerEmailPassList from "./CustomerEmailPassList";
const LoginPage = () => {
  const [loginAttempt, setLoginAttempt] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.authReducer);

  const history = useHistory();

  const handleLoginBtnClicked = () => {
    if (email.current.value === "") {
      document.getElementById("emailError").style.visibility = "visible";
      document.getElementById("emailInput").style.border = "3px solid red";
      document.getElementById("emailError").textContent =
        "please enter an email";
      return;
    }
    if (!email.current.value.includes("@")) {
      document.getElementById("emailError").style.visibility = "visible";
      document.getElementById("emailInput").style.border = "3px solid red";
      document.getElementById("emailError").textContent = "@ is missing";
      return;
    }
    if (password.current.value === "") {
      document.getElementById("passwordError").style.visibility = "visible";
      document.getElementById("passwordInput").style.border = "3px solid red";
      document.getElementById("passwordError").textContent =
        "please enter password";
      return;
    }
    const loginDetails = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(loginAction(loginDetails));
    setLoginAttempt(true);
  };
  useEffect(() => {
    dispatch(resetSearchModeAction());
    dispatch({ type: "LOGOUT" });
    setLoginAttempt(false);
    setLoginFailed(false);

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (loginAttempt) {
      if (userDetails.isLogged) {
        switch (userDetails.role) {
          case "ADMIN":
            dispatch(resetUserModeAction());
            history.push("/admin");
            break;
          case "COMPANY":
            history.push("/company");
            break;
          case "CUSTOMER":
            history.push("/main");
            break;
          default:
            break;
        }
        return;
      }
      document.getElementById("passwordError").style.display = "none";
      setLoginFailed(true);
    }

    return () => {};
  }, [userDetails, history]);

  return (
    <div className="container-fluid  container-login-page-bg">
      <div className="row h-100 pt-5 align-items-center justify-content-between">
        <div className="col-12 mt-2 col-lg-3 order-2 order-lg-1">
          <CompanyEmailPassList></CompanyEmailPassList>
        </div>
        <div className="col-12 col-lg-6 p-2 p-md-5 order-1 order-lg-2">
          <div className="container w-100 container-login-form">
            <div className="row ">
              <div className="col-12 col-sm-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mb-2" id="emailInputSection">
                    <label
                      htmlFor="emailInput"
                      className=" mb-3 fs-5 form-label"
                    >
                      Email
                    </label>
                    <input
                      onFocus={(e) => {
                        setLoginFailed(false);

                        e.target.style.border = "none";
                        document.getElementById("emailError").style.visibility =
                          "hidden";
                      }}
                      ref={email}
                      type="text"
                      className=" form-control"
                      id="emailInput"
                      aria-describedby="emailHelp"
                      autoComplete="off"
                    />
                    <span className="text-danger" id="emailError">
                      error
                    </span>
                  </div>

                  <div className="mb-2" id="passwordInputSection">
                    <label
                      htmlFor="passwordInput"
                      className="mb-3 fs-5 form-label"
                    >
                      Password
                    </label>
                    <input
                      onFocus={(e) => {
                        setLoginFailed(false);
                        e.target.style.border = "none";
                        document.getElementById(
                          "passwordError"
                        ).style.visibility = "hidden";
                        document.getElementById("passwordError").style.display =
                          "block";
                      }}
                      ref={password}
                      type="password"
                      className=" form-control"
                      id="passwordInput"
                    />
                    <span id="passwordError" className="text-danger">
                      error
                    </span>
                  </div>
                  {loginFailed ? (
                    <span className=" text-center fw-bold text-danger ">
                      Email or password inncorect
                    </span>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => {
                      handleLoginBtnClicked();
                    }}
                    type="submit"
                    className="btn btn-success"
                  >
                    Login
                  </button>
                </form>
              </div>
              <div className="col-6 d-none d-sm-block">
                <img
                  style={{ width: "90%", height: "90%", margin: "20px" }}
                  src={homePic}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 order-3">
          <CustomerEmailPassList></CustomerEmailPassList>
        </div>
      </div>
      <div className="remain-space">*</div>
    </div>
  );
};

export default LoginPage;