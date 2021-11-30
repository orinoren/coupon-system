## `Company main`

### useSelctors

1. `companyCouponUpdateMode`: determine if the company is in coupon update mode to update coupon.

2. `companyCouponAddMode`:determine if the company is in coupon add mode to add coupon.

3. `userDetails`: holds the details of the current login user.

### Methods

1. `handleButtonClick` :
   if `companyCouponUpdateMode` dispatch `companyCouponResetUpdateModeAction()` to close the update coupon environment .
   if `companyCouponAddMode` dispatch `companyCouponResetAddModeAction()` to close the add coupon environment .
   if nither dispatch `companyCouponAddModeAction()` to show the add coupon environment .
2. `getOperationButtonTitle` :
   Check in which mode the company is in to determine the title of the button.

### useEffect

On every change in the `userDetails.isLogged` and `userDetails.role` a check for if `userDetails.role` is Company or if the user is logged
if one of the conditions is false the user rout to the home page .
if conditions are met dispatch `companyModeAction()` to other opertaions autherization.
