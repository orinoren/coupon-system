## `NavBar functions`

### Methods

1. `getAdminNavBarItemsFunc` : returns a list of

- CustomerOp with onClick event that dispatch
  `showCustomerOpAction` to open the `</AdminCustomerBox>` components.
- CompanyOp with onClick event that dispatch
  `showCompanyOpAction` to open the `</AdminCompanyBox>` components.

2. `getCompanyNavBarItemsFunc` : returns a list of

- Coupon OP with onClick event that dispatch `(companyCouponAddModeAction())` to open the `</CompanyOperationsForm>` and `</CompanyOperationsCouponView>` components.

3. `getCustomerNavBarItemsFunc` : returns a list of

- Your Coupons with onClick event that dispatch `(showCustomerCouponsAction())`
  to show the customer coupons.

4. `getCartIconFunc` : return a cart icon with onClick event that calls `handleCartIconClicked()` to open the `</Cart>` component.
   if the cart amount is zero the the notificatin of cart coupon amount is not shown.
5. `getLoginButtonFunc` : return a login/logout button
   if the user login

- onClick event that `handleLogoutBtnClicked()`.
- text of logout.
  if the user logout
- onClick event that `handleLoginBtnClicked()`.
- text of login.
