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
  `couponValidation` from the utile folder .
- if coupon is valid.
- making a json object without the image .
- Checks if the company is in add mode to determine if the coupon need to be added .
- if true
- dispatch `companyAddCouponAction` with the coupon object and the coupon image seperatly and exit the function.
- Checks if company in update mode.
- if true
- dispatch `companyUpdateCouponAction`
  with
- coupon Object with the coupon image id
- coupon image seperatly.

### `Company operations form `

### `Utils`
