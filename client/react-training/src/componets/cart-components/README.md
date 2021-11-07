# `Cart components`

1. shows the content of the coupon that the user is add to the cart. <br/>
2. show the cart summery price and a button to make the purchase.

## `Cart coupon content`

## useState

1. `endDateView`: holds the endDate of the coupon added to the cart

## useSelector

1. `cartCouponsContent` : contain all the coupons that added to the cart

## useEffect

1.  setting the end date for every coupon that added to the cart to <br/>
    look as the wanted pattern

## Render

if no image is found the image will be a default one

## `Cart summery`

## useSelector

1. `cartSummery` : holds the sum price of all the coupons in the cart
2. `couponPurchaseDetails` : holds details about the purchase
   if its succeed or failed<br/>to determine which messege to show to the user
3. `couponsToPurchase` : conatin all the coupons that in the cart
4. `userDetails` : holds details about the current user logged in

## Methods

1. `handlePurchaseBtnClicked` :

- checks if the user is logged in if false routing the user to the login page
  and `dispatch(resetUserModeAction())` to initial to global mode.
- if true calls `handlePurchaseBtnClickedFunc()` to continue the proccess

2. `getPurchaseMsg` : return `getPurchaseMsgFunc(couponPurchaseDetails)`
