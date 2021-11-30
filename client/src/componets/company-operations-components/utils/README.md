## `Company operations functions`

1. `handleOnCouponChangeFunc` :

- Enter a switch case block
- case title/category/description/startDate/endDate/amount/price : setting the `couponObj` with the enterd values.
- case image : `setImageView` to the ObjectUrl that created from the fie of the image inserted to help us to display it immediatly on the `</CompanyOperationsCouponView>` component.
  and setting the `couponObj` with the image inserted.
- case clear-form :

1. set `couponIbj` to default properties
   and `setImageView` to default image for the `</CompanyOperationsCouponView>` component.
2. getting all the error messeges that in the form ,iterating over them for cleaning their text content.
3. Checks if the coupon submitted to clear also the server error messege.
4. `couponValidation` :

- create a variable of isValid that is true
- Checks every property if its valid if some of the inputs are not valid an error messege appear and isValid return as false to let the user know that he need to change the inputs.

5. `getCouponSubmitMsgFunc` :

- Checks if coupon submit is faild

1.  if failed return a error messege form the server.
2.  if not succeeded Checks if company in add coupon mode if true return a `Coupon added successfully` messege.
3.  if not add mode return a `Coupon updated successfully` messege.
