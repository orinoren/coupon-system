import {
  showCustomerOpAction,
  showCompanyOpAction,
  showCustomerCouponsAction,
  companyCouponAddModeAction,
} from "../../../actions/actions-for-ui/action-for-ui";
export const getAdminNavBarItemsFunc = (dispatch) => (
  <ul className="navbar-nav m-0 me-md-auto mb-2 mb-lg-0">
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
    <div className="px-1 px-md-5 pt-4">
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
    </div>
  );
};
export const getLoginButtonFunc = (
  isLogged,
  handleLogoutBtnClicked,
  handleLoginBtnClicked
) => {
  return (
    <form className="nav-item d-flex pt-4 ">
      <button className="btn btn-outline-success" type="button">
        {isLogged ? (
          <div onClick={() => handleLogoutBtnClicked()}>Log out</div>
        ) : (
          <div onClick={() => handleLoginBtnClicked()}>Login</div>
        )}
      </button>
    </form>
  );
};
