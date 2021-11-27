## `CouponCardListFunctions`

`getAllCouponsCardsFunc`:
Parameters :

- `searchMode` : determine if user made a search or coupon .
- `splitedAllCoupons`: conatins all coupons to show to the user .
- `showCustomerCoupons`: determine if its the customer coupons to show .

1. If user made a search and the no coupon found
   a not found messege appear.

2. return an array of `<CouponCard>` with relevent properties of each coupon.
