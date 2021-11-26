## `Actions for customer`

- All actions using using `AuthenticatedAxios` that contain the prefix for the url and the user jwt for authentication in the backend.
- All actions are made inside a try catch block.

### `Purchase coupon action`

1. Making a post http request that conatin an array of all the coupons id
   to purchase.
2. if the respons status is 200 (OK) the purchase made succesfuly and
   - Trigger the redux store state to rerender and getting all the customer coupons immediatly and to show the messege of succesfull purchase coupons.

### `Get all customer coupons action`

1. Making a get http request.
2. Assign the data from the response to `allCustomersCoupns` as an array.
3. Looping through `allCustomersCoupons` to convert that date details
   from an array form to date form.
4. Insert the value of `allCustomersCoupons` to redux store.
