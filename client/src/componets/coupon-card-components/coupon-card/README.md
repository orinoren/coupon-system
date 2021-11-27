## `CouponCard`

### `useState`

1. `showAddToCartControlles`: determine if to show the user a add or remove from cart controllers.
2. `showDescription`: determins if to show the description of the coupon.
3. `couponAddToCartAmount`:
   holds the amount the same coupon that added to the cart.

### `useSelector`

1. `companyCouponAddMode`: check if the company is in add coupon mode.

2. `userDetails`:
   holds the details of current login user.

### `useEffect`

every time a coupon purchase details change after every try of purchase coupon a check is made to see if the purchase made successfully if true a rest made for `showAddToCartControllers`
and `setCouponAddToCartAmount` to start a new purcahse .

### `Methods`

1. `getCouponCardFotter`:
   calls `getCouponCardFotterFunc()`,
2. `handleCouponClicked`:
   on every click on the coupon a the decription is open and close,

### `Render`

If the image cant be procces so the default image is replace the current one
