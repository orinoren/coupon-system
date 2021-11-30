## `MainPageContent`

### useSelector

1. `showSearchMode` :
2. `showOperationsFor` : determine of which operations to show for customers or companies and let us know on whice mode administrator is in .
3. `purchaseSucceed` : true or false if the customer purchase made succesfully
4. `showCustomerCoupons` : true or false if to show the customer coupons.
5. `addedCoupon` : contains the details about the last added coupon by the company.
6. `updatedCoupon` : contains the details about the last updated coupon by the company.
7. `deletedCoupon` : contains the id of the last deleted coupon by the company.
8. `userDetails` : holds details about the current user logged in

### useEffect

On every change in addedCoupon/updatedCoupon/deletedCoupon/purchaseSucceed/userDetails

1. enter a switch case block with the userDetails role

- case Company dispatch `getAllCompanyCouponsAction` to retreive the most upadted company coupons.
- case Admin dispatch `getAllCouponsAction` to retreive the most upadted coupons.
- case Customer dispatch `getAllCustomerCouponsAction`
  and `getAllCouponsAction` to retreive the most upadted coupons and customer coupons.

### Render

1. Checks if to show the search coupon result
   by checking if `showSearchMode`(determine by clicking the search button)
   is true.
   and `showOperationsFor.customerOp`(cheack if the search is made by admin to search for customers)
   is false.
   and `showOperationsFor.companyOp`(cheack if the search is made by admin to search for companies)
   is false.
   if all conditons are approved a `</CouponCardListSection>` component is show with the coupons search result.
2. Checking if `showCustomerCoupons` is true to determine if to show the customer coupons.
3.

- Checking if `userDetails.role` is Company to determine if to show the company coupons.
- if not Company the all the coupons seperate by categories is shown for customer and admin .
