### `Main Search Form`

# useSelcetors :

1. `allCompanies`: contains all companies.
2. `allCustomers`: conatines all customers.
3. `allCoupons` : contains all coupons.
4. `allCompanyCoupons` : contains all coupons of the current login company.
5. `showOperationsFor` : determine of which operations to show for customers or companies and let us know on whice mode administrator is in .
6. `loginDetails`: conatins all necessary details about the current login user .

# useState :

1. `showSortBox` : Click on the sort button changing the value from true to false
   and the opposite to close and open the sort box for advanced search.

# useRef :

1. `searchInput` : hold the search input value to compare and retrieve the relevant
   data to what the user search for

# Methods :

`handleSearchButtonClicked` :

1. checks if the search is with sort with `checkIfSearchWithSortMethod()` that return boolean and all category inputs that are checked
2. if it is a search with sort get the max price input from the user choose and calling
   the `dispatchSortedSearchResultCouponList()`
   and setShowSortBox to false to automatic close the sort container

3. if it is a regular search a switch case for the current role that is use the search operation is activated
4. if the case is ADMIN,
   a check for if it is a search for
   customers `dispatchAdminSearchResultForCustomers()`
   or companies `dispatchAdminSearchResultForCompanies()` or coupons `dispatchSearchResultCouponList()`by checking the `showOperationsFor` that hold's the current mode of opertaion for the admin

5. if the case is COMPANY `dispatchSearchResultCouponList()` for all coupons of the current logged in company

6. if the case is default so its must be Client or Guest `dispatchSearchResultCouponList()` on all coupons
   is called

### `Main Search Form Functions`

# Methods :

1. `checkIfSearchWithSort` : checks if the search is with sort by iterating through all the input of the categories if the input is checked the id of input is
   added to `checkedCategoryInputs` array and `isSearchWithSort` becomes true and returning the `checkedCategoryInputs` array and `isSearchWithSort`. else if no category input found as checked returning the `checkedCategoryInputs` empty array and `isSearchWithSort` as false.

2. `dispatchSearchResultCouponList` :
   filter the array by checking if the `searchInput`
   is includes in coupon title and dispatch the result to `SEARCH-RESULT-COUPON-LIST` reducer

3. `dispatchSortedSearchResultCouponList` :
   #a. checks which is the current user role
   #b. if role is COMPANY filter the array of the current company coupons that activate the search opertaion by checking if the `searchInput`
   is includes in coupon title and if `checkedCategoryInputs` includes the coupon category and if `maxPriceInput` is less then or equal coupon price.
   #c. dispatch the result to `SEARCH-RESULT-COUPON-LIST` reducer
   #d. if role is not COMPANY filter the array of all coupons by same logic as #b and #c

4. `dispatchAdminSearchResultForCompanies` :
   filter the array of all Companies that company name includes the `searchInput`
   and dispatch the result `SEARCH-RESULT-COMAPNY-LIST` reducer

5. `dispatchAdminSearchResultForCustomers` :
   filter the array of all Customer that customer first name or customer last name includes the `searchInput`
   and dispatch the result `SEARCH-RESULT-CUSTOMER-LIST` reducer
