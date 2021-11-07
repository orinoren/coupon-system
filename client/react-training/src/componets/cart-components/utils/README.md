# `Cart Functions`

1. `handlePurchaseBtnClickedFunc` :

- every coupon in the cart holds a prop of couponCartAmount that determine
  how many of the same coupon in the cart

looping through `couponsToPurchase` on every coupon looping through <br/>
couponCartAmount and insert the coupon id to `couponsIdArr`. <br/>
after the iteration done and all the wanted purchased<br/>
coupons id's in the `couponsIdArr` :

- `dispatch(purchaseCouponAction())`: to make the purchase .
- `dispatch(resetCartAction())`: to empty the cart content for new purchase proccess
- `dispatch(resetCartNotificationAction())` : reset the cart notification
