import {
  showCustomerOpAction,
  showCompanyOpAction,
  showCustomerCouponsAction,
  companyCouponAddModeAction,
} from "../../../actions/actions-for-ui/action-for-ui";
export const getAdminNavBarItemsFunc = (dispatch) => (
  <ul className="text-start navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
    <li className="nav-item nav-link active nav-li ">Home</li>
    <li className="nav-item nav-link nav-li">
      <span
        onClick={() => {
          dispatch(showCustomerOpAction());
        }}
      >
        Customer Op
      </span>
    </li>
    <li className="nav-item nav-link nav-li">
      <span
        onClick={() => {
          dispatch(showCompanyOpAction());
        }}
      >
        Company Op
      </span>
    </li>
  </ul>
);
export const getCompanyNavBarItemsFunc = (dispatch) => (
  <ul className="navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
    <li className="nav-item nav-link active nav-li ">Home</li>
    <li className="nav-item nav-link nav-li">
      <span onClick={() => dispatch(companyCouponAddModeAction())}>
        Coupon OP
      </span>
    </li>
  </ul>
);
export const getCustomerNavBarItemsFunc = (dispatch) => (
  <ul className="navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
    <li className="nav-item nav-link active nav-li ">Home</li>
    <li className="nav-item nav-link nav-li">
      <span onClick={() => dispatch(showCustomerCouponsAction())}>
        Your Coupons
      </span>
    </li>
  </ul>
);
export const getCartIconFunc = (
  handleCartIconClicked,
  cartNotificationAmount
) => {
  return (
    <span>
      <span>
        <i
          onClick={() => {
            handleCartIconClicked();
          }}
          className="text-primary fs-2 fas fa-shopping-cart"
        >
          {cartNotificationAmount > 0 ? (
            <span className="cart-notification">{cartNotificationAmount}</span>
          ) : (
            ""
          )}
        </i>
      </span>
    </span>
  );
};
export const getLoginButtonFunc = (
  isLogged,
  handleLogoutBtnClicked,
  handleLoginBtnClicked
) => {
  return (
    <span>
      <button
        onClick={
          isLogged
            ? () => handleLogoutBtnClicked()
            : () => handleLoginBtnClicked()
        }
        className="nav-login-logut-button"
        type="button"
      >
        {isLogged ? <div>Log out</div> : <div>Login</div>}
      </button>
    </span>
  );
};
