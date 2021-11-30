## `Cart`

### useSelector

1. `cartNotificationAmount` : holds the amount of the coupons in the cart.

### Mathods

1. `handleExitCartButtonClicked` :

- dispatch `cartResetShowViewAction()` to close the `<Cart>` component
- dispatch `PURCHASE-COUPON-RESET-MSG` to reset the messege after purchase coupon is made.
