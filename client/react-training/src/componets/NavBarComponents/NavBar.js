import "./NavBar.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  companyCouponAddModeAction,
  resetCartAction,
  resetCartNotificationAction,
} from "../../actions/actions-for-ui/action-for-ui";
import {
  cartShowViewAction,
  companyCouponResetUpdateModeAction,
  resetSearchModeAction,
  resetUserModeAction,
  adminOperationsBoxState,
  cartResetShowViewAction,
  showCompanyOpAction,
  showCustomerOpAction,
  companyCouponResetAddModeAction,
  showCustomerCouponsAction,
  resetShowCustomerCouponsAction,
} from "../../actions/actions-for-ui/action-for-ui";

const NavBar = () => {
  const dispatch = useDispatch();
  const cartNotificationAmount = useSelector(
    (state) => state.uiRootReducer.cartPropertisReducer.cartNotification
  );
  const guestOrCustomerMode = useSelector(
    (state) => state.uiRootReducer.globalModeReducer.guestOrCustomerMode
  );
  const loginDetails = useSelector((state) => state.authReducer);

  const history = useHistory();

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
  return (
    <>
      <nav className="my-navbar navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <div
            onClick={() => hanldeHeaderClicked()}
            className="navbar-brand d-none d-md-inline my-navbar-header"
          >
            COUPON PROJECT
          </div>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
              <li className="nav-item nav-link active nav-li ">
                {loginDetails.logged ? "Home" : ""}
              </li>
              <li className="nav-item nav-link nav-li">
                {loginDetails.role === "ADMIN" ? (
                  <span
                    onClick={() => {
                      dispatch(adminOperationsBoxState("customer"));
                      dispatch(showCustomerOpAction());
                    }}
                  >
                    Customer Op
                  </span>
                ) : loginDetails.role === "COMPANY" ? (
                  <span onClick={() => dispatch(companyCouponAddModeAction())}>
                    Coupon OP
                  </span>
                ) : loginDetails.role === "CUSTOMER" ? (
                  <span onClick={() => dispatch(showCustomerCouponsAction())}>
                    {/* Customer */}Your Coupons
                  </span>
                ) : (
                  ""
                )}
              </li>
              <li className="nav-item nav-link nav-li">
                {loginDetails.role === "ADMIN" ? (
                  <span
                    onClick={() => {
                      dispatch(adminOperationsBoxState("company"));
                      dispatch(showCompanyOpAction());
                    }}
                  >
                    Company Op
                  </span>
                ) : (
                  ""
                )}
              </li>
            </ul>
            {guestOrCustomerMode ? (
              <div className="px-1 px-md-5 pt-4">
                <span>
                  <i
                    onClick={() => {
                      handleCartIconClicked();
                    }}
                    className="text-primary fs-2 fas fa-shopping-cart"
                  >
                    {cartNotificationAmount === 0 ? (
                      ""
                    ) : (
                      <span className="cart-notification">
                        {cartNotificationAmount}
                      </span>
                    )}
                  </i>
                </span>
              </div>
            ) : (
              ""
            )}
            <form className="nav-item d-flex pt-4 ">
              <button className="btn btn-outline-success" type="button">
                {loginDetails.logged ? (
                  <div onClick={() => handleLogoutBtnClicked()}>Log out</div>
                ) : (
                  <div onClick={() => handleLoginBtnClicked()}>Login</div>
                )}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
