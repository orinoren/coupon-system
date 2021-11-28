import "./NavBar.css";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  resetCartAction,
  resetCartNotificationAction,
} from "../../actions/actions-for-ui/action-for-ui";
import {
  cartShowViewAction,
  companyCouponResetUpdateModeAction,
  resetSearchModeAction,
  resetUserModeAction,
  cartResetShowViewAction,
  companyCouponResetAddModeAction,
  resetShowCustomerCouponsAction,
} from "../../actions/actions-for-ui/action-for-ui";
import {
  getAdminNavBarItemsFunc,
  getCartIconFunc,
  getCompanyNavBarItemsFunc,
  getCustomerNavBarItemsFunc,
  getLoginButtonFunc,
} from "./utils/NavBarFunctions";

const NavBar = () => {
  const [showMobileNavBar, setshowMobileNavBar] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  const cartNotificationAmount = useSelector(
    (state) => state.uiRootReducer.cartPropertisReducer.cartNotification
  );
  const guestOrCustomerMode = useSelector(
    (state) => state.uiRootReducer.globalModeReducer.guestOrCustomerMode
  );
  const userDetails = useSelector((state) => state.authReducer);

  const handleCartIconClicked = () => {
    dispatch(cartShowViewAction());
  };
  const hanldeHeaderClicked = () => {
    dispatch(resetSearchModeAction());
    dispatch({ type: "RESET-COMPANY-COUPONS" });
    dispatch({ type: "RESET-CUSTOMER-COUPONS" });
    dispatch(resetShowCustomerCouponsAction());
    history.push("/home");
  };

  const handleLogoutBtnClicked = () => {
    let userWasLogged = userDetails.role;
    dispatch({ type: "LOGOUT" });
    dispatch(resetUserModeAction());
    history.push("/home");
    switch (userWasLogged) {
      case "CUSTOMER":
        dispatch(cartResetShowViewAction()); //customer
        dispatch(resetCartAction()); //customer
        dispatch(resetCartNotificationAction()); //customer
        dispatch({ type: "RESET-CUSTOMER-COUPONS" }); //customer
        dispatch(resetShowCustomerCouponsAction()); //customer
        dispatch(resetSearchModeAction()); //all
        break;
      case "COMPANY":
        dispatch(companyCouponResetAddModeAction()); //company
        dispatch(companyCouponResetUpdateModeAction()); //company
        dispatch({ type: "RESET-COMPANY-COUPONS" }); //company
        dispatch(resetSearchModeAction()); //all

      default:
        dispatch(resetSearchModeAction()); //all
        break;
    }
  };

  const handleLoginBtnClicked = () => {
    history.push("/login");
  };

  const getNavBarItems = () => {
    switch (userDetails.role) {
      case "ADMIN":
        return getAdminNavBarItemsFunc(dispatch);
      case "COMPANY":
        return getCompanyNavBarItemsFunc(dispatch);
      case "CUSTOMER":
        return getCustomerNavBarItemsFunc(dispatch);
      default:
        return (
          <ul className="navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
            <li className="nav-item nav-link nav-li "></li>
          </ul>
        );
    }
  };
  const getLoginButton = () => {
    return getLoginButtonFunc(
      userDetails.isLogged,
      handleLogoutBtnClicked,
      handleLoginBtnClicked
    );
  };
  const getCartIcon = () => {
    if (guestOrCustomerMode) {
      return getCartIconFunc(handleCartIconClicked, cartNotificationAmount);
    }
    return "";
  };
  return (
    <>
      <nav className="my-navbar navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid p-0">
          <div className="row w-100 p-0 m-0">
            <div className="col-2 d-block d-md-none">
              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span
                  onClick={() => setshowMobileNavBar(!showMobileNavBar)}
                  className="navbar-toggler-icon"
                ></span>
              </button>
            </div>
            <div className="col-10 col-md-4 col-lg-3 px-1">
              <div
                onClick={() => hanldeHeaderClicked()}
                className="navbar-brand text-center px-2 m-0 fs-2 fs-xs-4 my-navbar-header"
              >
                COUPON PROJECT
              </div>
            </div>
            <div className="col-8 p-0 col-lg-9">
              <div className="container-fluid p-0 h-100 w-100 for-collapse">
                <div className="row m-0 pt-2">
                  <div className="col-8 p-0">{getNavBarItems()}</div>
                  <div className="col-2 pt-2 text-end"> {getCartIcon()}</div>
                  <div className="col-2 pt-2 p-0 text-center">
                    {getLoginButton()}
                  </div>
                </div>
              </div>
            </div>
            {showMobileNavBar ? (
              <div className="d-md-none">
                <div className="container-fluid w-100 ">
                  <div className="row">
                    <div className="col-12">{getNavBarItems()}</div>
                    <div className="col-12 text-start py-2">
                      {getCartIcon()}
                    </div>
                    <div className="col-12 text-start"> {getLoginButton()}</div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
