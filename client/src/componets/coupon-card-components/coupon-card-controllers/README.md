## `CouponControllers`

### `useState`

1. `couponAddToCartAmount` :
   holds the amount of the same coupon in the cart.
2. `addOrRemoveClicked` : holds deatils of which button clicked

### `useEffect`:

in every change of `controlAmount` or `addOrRemoveClicked` a check is made if the add is click or the remove clicked
-if add clicked `dispatch(addToCartAction)`
with coupon details and the amount of the same coupon

-if remove clicked `dispatch(removeFromCartAction)`
with coupon details and the amount of the same coupon

### `Methods`

1. `handleIncrementCouponToCartClicked`:

- Stop propagation to not trigger the parent component when clicked.
- increment `ControlAmount` and `CouponAddToCartAmount` by 1
- `dispatch(incrementCartNotificationAction)` with the coupon price to add the price of the coupon to the cart.
- set `AddOrRemoveClicked` to trigger a render to activate the use effect to continue the opertaion with the updated values.

2. `handleDecrementCouponToCartClicked` :- Stop propagation to not trigger the parent component when clicked

- decrement `ControlAmount` and `CouponAddToCartAmount` by 1
- `dispatch(decrementCartNotificationAction)` with the coupon price to remove the price of the coupon to the cart.
- set `AddOrRemoveClicked` to trigger a render to activate the use effect to continue the opertaion with the updated values.
