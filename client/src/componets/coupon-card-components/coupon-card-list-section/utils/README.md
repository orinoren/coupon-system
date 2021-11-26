# `Coupon card list section functions`

1. `getCouponListFunc` : switch case statement that return the relevant coupon list determine by the title parameter
2. `getCardListSectionControllersFunc` : return a clickable text of see more/less

- more : on click calls `handleSeeMoreClicked()`
- less : on click calls `handleSeeLessClicked()`
- `getExitButton` : optional exit button

3. `getExitButton` : return a exit button if `searchMode`(when user search for coupon) or `showCustomerCoupons`(when customer click to see is coupons) is true <br/>

- onClick calls `handleExitCouponListSectionButtonClicked()`

4. `handleSeeMoreClicked` : change `NumberOfCouponsToShow` state to plus 6
   to let the user see more 6 coupons
5. `handleSeeLessClicked` : change `NumberOfCouponsToShow` state to minus 6
   to let the user see less 6 coupons
6. `handleExitCouponListSectionButtonClicked` :
   taking a title has a parameter and check if the title is result if true its a
   search coupon card list section when clicked `dispatch(resetSearchModeAction())`
   called to close the search result.
   if the title is not result so it is a customer coupons card list section
   and `dispatch(resetShowCustomerCouponsAction())` to close the section.
