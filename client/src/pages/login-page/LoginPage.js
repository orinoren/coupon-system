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
import { loginDetailsValidation } from "./utils/loginPageFunctions";
const LoginPage = () => {
  const [loginAttempt, setLoginAttempt] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const emailErrorRef = useRef();
  const passwordErrorRef = useRef();
  const usernamePasswordErrorRef = useRef();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.authReducer);

  const history = useHistory();

  useEffect(() => {
    usernamePasswordErrorRef.current.style.display = "none";
    dispatch(resetSearchModeAction());
    dispatch({ type: "LOGOUT" });
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (loginAttempt) {
      const loginDetails = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };
      dispatch(loginAction(loginDetails));
    }
    return () => {};
  }, [loginAttempt, dispatch]);

  useEffect(() => {
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
    }
    if (userDetails.loginFailed) {
      passwordErrorRef.current.style.display = "none";
      usernamePasswordErrorRef.current.style.display = "block";
      setLoginAttempt(false);
    }
    return () => {};
  }, [userDetails, history, dispatch]);

  const handleLoginBtnClicked = () => {
    const isLoginDetailsValid = loginDetailsValidation(
      emailInputRef,
      emailErrorRef,
      passwordInputRef,
      passwordErrorRef
    );
    if (isLoginDetailsValid) {
      setLoginAttempt(true);
    }
  };
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
                        usernamePasswordErrorRef.current.style.display = "none";
                        e.target.style.border = "none";
                        emailErrorRef.current.style.visibility = "hidden";
                        passwordErrorRef.current.style.display = "block";
                        passwordErrorRef.current.style.visibility = "hidden";
                      }}
                      ref={emailInputRef}
                      type="text"
                      className=" form-control"
                      id="emailInput"
                      aria-describedby="emailHelp"
                      autoComplete="off"
                    />
                    <span
                      ref={emailErrorRef}
                      className="text-danger fw-bold"
                      id="emailError"
                    >
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
                        usernamePasswordErrorRef.current.style.display = "none";
                        e.target.style.border = "none";
                        passwordErrorRef.current.style.display = "block";
                        passwordErrorRef.current.style.visibility = "hidden";
                      }}
                      ref={passwordInputRef}
                      type="password"
                      className=" form-control"
                      id="passwordInput"
                    />
                    <span
                      ref={passwordErrorRef}
                      id="passwordError"
                      className="text-danger fw-bold my-2"
                    >
                      error
                    </span>
                  </div>
                  <div
                    ref={usernamePasswordErrorRef}
                    className="my-2 fw-bold text-danger "
                  >
                    Email or password inncorect
                  </div>
                  <button
                    onClick={() => {
                      handleLoginBtnClicked();
                    }}
                    type="submit"
                    className="p-2 px-4 btn btn-success"
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
