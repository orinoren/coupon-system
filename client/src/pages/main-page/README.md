## `Main`

### useSelector

1. `cartCouponsContent`: contain the coupons that in the cart.
2. `showCart`: deterimne if to show the cart component .

### useEffect

1. On every change in coupon cart content dispatch `({ type: "PURCHASE-COUPON-RESET-MSG" })` to reset the purchase coupon messege.
   `
