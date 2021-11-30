## `Company operations components`

This folder contain all the relavent componets and operations for company user.

### `Company operations`

### useState

1. `couponObj` : holds the default details for `</CompanyOperationsForm>` and `</CompanyOperationsCouponView>` for add Coupon mode.
2. `imageView` : holds the current image of the coupon for `</CompanyOperationsForm>` and `</CompanyOperationsCouponView>` to seperate the coupon image to render on every other coupon detail that change.

### useRef

1. `serverErrorRef` : reference for server error element.
2. `categoryInputRef`: reference for category selecet box element.
3. `titleErrorRef`: reference for title error element.
4. `categoryErrorRef`: reference for category error element.
5. `starDateErrorRef`: reference for start date error error element.
6. `endDateErrorRef`: reference for end date error error element.
7. `amountErrorRef` : reference for amount error error element.
8. `priceErrorRef` : reference for price error error element.

### useSelector

1. `companyCouponUpdateMode` : determine if the company is trying to update coupon.
2. `companyCouponAddMode` : determine if the company try to add a coupon.
3. `companyCouponToUpdateObj` : hold the details about the coupon that the company try to update.
4. `submitMsgView` : determine if the company submitted a coupon for show the relevant messege for company pre submit.

### useEffect

On every change in the `companyCouponToUpdateObj`
and the `companyCouponAddMode`.

1. Check `companyCouponUpdateMode` if true `setCouponObj` to `companyCouponToUpdateObj`.

- if true:
- `setImageView` to `companyCouponUpdateObj` in base 64 to set the `</CompanyOperationsCouponView>` image view.
- change the `categoryInputRef` value to the value of companyCouponToUpdateObj category to make it visible in the ``</CompanyOperationsForm>` and `</CompanyOperationsCouponView>`.
- if false:
- `setImageView` to default image.

### Methods

`handleOnCouponChange` : calls `handleOnCouponChangeFunc` from the utils folder.

### `Company operations coupon view`

### useSelector

1. `couponOperationsDetails` : conatin the details about the operation after company try to add/update coupon.

### useEffect

On every change in the add mode or the coupon object
(the company press on othe coupon to update or company oress on add mode or close add mode or close update mode)
dispatch `companyResetSubmitCoupon` action to reset the submit coupon messege.

### Methods

1. `getCatgeoryForView` : Checks if the value of coupon category is default value (`Choose...`) return a Category for the coupon view.
   if not default value return the current text content of the select option in the select box.
2. `handleCouponSubmit`:

- Checks if the coupon is valid by passing the current coupon object to
  `couponValidation` from the utils folder .

- if coupon is valid.

1. making a json object without the image .
2. Checks if the company is in add mode to determine if the coupon need to be added .

- if true

1. dispatch `companyAddCouponAction` with the coupon object and the coupon image seperatly and exit the function.

- Checks if company in update mode.
- if true

1. dispatch `companyUpdateCouponAction`
   with

- coupon Object with the coupon image id
- coupon image seperatly.

### `Company operations form `

## Render

1. On every element there is an onFocus event that making is relevant error messeg
   to clear and if the coupon is submitted
   dispatch `companyResetSubmitCoupon` to clear the server error messege.
2. On every element there is an onChange event that calls `couponViewFunc` with the element details to make the changes on the `</CompanyOperationsCouponView>` component.
3. image has a also an onClick event to make the target null on every click to make the onChange works without history image.
4. clear element has only onClick event to clear all the details of the form to start fresh.

### `Utils`

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
