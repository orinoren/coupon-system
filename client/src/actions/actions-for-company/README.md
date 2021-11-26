## `Actions for company`

- All actions using using `AuthenticatedAxios` that contain the prefix for the url and the user jwt for authentication in the backend
- All actions are made inside a try catch block

### `Add coupon action`

1. Creating a form data that contain the image file
2. Making a post http request with the form data and `couponObj` as a params
3. If response status is 201 (created) then the add made successfuly and
   - Trigger the redux store state to rerender and getting all the company coupons immediatly and to show the messege of succesfull add coupon
4. If response status is not 201 then add is failed and inside the catch block error messege trigger for the user to try again

### `Delete coupon action`

1. Making a delete http request that contain the coupon id
2. If the response status is 200 (OK) then the delete made successfuly and
   - Trigger the redux store state to rerender and getting all the coupons immediatly

### `Get all company coupons action`

1. Making a get http request
2. Assign the data from the response to `allCompanyCoupns` as an array
3. Looping through `allCompanyCoupons` to convert that date details
   from and array form to date form
4. Insert the value of `allCompanyCoupons` to redux store.

### `Update coupon action`

1. Checking if the image is an instance of a file to see if the coupon image is change
2. If false then Making a post request only with the `couponObj` without the image.
   If true
   - creating a form data that contain the image file
   - Making a post http request with the form data and `couponObj` as a params
3. If response status is 201 (created) then the update made successfuly and
   Trigger the redux store state to rerender and getting all the company coupons immediatly and to show the messege of succesfull update coupon
4. If response status is not 201 then add is failed and inside the catch block error messege trigger for the user to try again
