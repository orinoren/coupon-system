import "./NavBar.css";
import React from "react";
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
    dispatch({ type: "LOGOUT" });
    dispatch(resetUserModeAction());
    history.push("/home");
    dispatch(cartResetShowViewAction());
    dispatch(resetCartAction());
    dispatch(resetCartNotificationAction());
    dispatch(companyCouponResetAddModeAction());
    dispatch(companyCouponResetUpdateModeAction());
    dispatch({ type: "RESET-COMPANY-COUPONS" });
    dispatch({ type: "RESET-CUSTOMER-COUPONS" });
    dispatch(resetShowCustomerCouponsAction());
    dispatch(resetSearchModeAction());
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
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            onClick={() => hanldeHeaderClicked()}
            className="navbar-brand my-navbar-header"
          >
            COUPON PROJECT
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            {getNavBarItems()}
            {getCartIcon()}
            {getLoginButton()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
