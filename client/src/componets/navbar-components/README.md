## `NavBar`

### `useState`

1. `showMobileNavBar`: determine if to open the navbar for mobile.

### `useSelector`

1. `cartNotificationAmount`: holds the amount of products in the cart.

2. `userDetails`:holds the details of the current login user.

### `Methods`

1. `handleCartIconClicked` : `dispatch(cartShowViewAction())` to open the cart component
2. `hanldeHeaderClicked` :

- `dispatch(resetSearchModeAction())` to reset the search mode for next fresh start.
- `dispatch({ type: "RESET-COMPANY-COUPONS"})` to reset the company couopns in the redux store
- `dispatch({ type: "RESET-CUSTOMER-COUPONS" })` to reset the customer coupons in the redux store -`dispatch(resetShowCustomerCouponsAction())` remove the show customer coupons view to next user have a fresh start. -`history.push("/home")` to route the user to the home page.

3. `handleLogoutBtnClicked` :
4. `handleLoginBtnClicked` : route the user to the login page
5. `getNavBarItems` : checks which user role is login

- if admin calls `getAdminNavBarItemsFunc()`;
- if company calls `getCompanyNavBarItemsFunc()`;
- if customer calls `getCustomerNavBarItemsFunc()`;

6. `getLoginButton` : calls `getLoginButtonFunc()`
7. `getCartIcon` : checks if `userDetails.role` is guest or customer

- if true calls `getCartIconFunc()` else return nothing.
