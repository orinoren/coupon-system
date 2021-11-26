## `Actions for guest`

### `Get all coupons action`

1. Making a get http request
2. Assign the data from the response to `allCoupons` as an array.
3. Looping through `allCoupons` to convert that date details.
   from and array form to date form.
4. Insert the value of `allCoupons` to redux store.

### Methods

#### `converArrayToDate`

taking an array as a parameter and converting the array to form of yyyy-mm-dd
to make the visiblity in the ui much easier.
