# `Coupon card list section`

## useState

1. `numberOfCouponsToShow` : holds the default number of coupons to show to the user

## useSelector

1. `allCompanyCoupons` : contains all current login company coupons
2. `allCoupons` : conatins all coupons
3. `allCustomerCoupons` : conatins all current login customer coupons
4. `userDetails` : holds details about the current login user

## Methods

1. `getCouponList` : return `getCouponListFunc()`
2. `getCardListSectionSeeControllers` : `getCardListSectionControllersFunc()`

## Render

- if the title is includes "Your Coupons(Company)" or "Your Coupons(Customer)" <br/>
  (used to determine which coupon list to show) change the title <br/>
  for just Your Coupon by subString just the 12 first letters <br/>
  for every other title its remain the same as is .
