## `actions-for-admin-for-company`

all actions using using `AuthenticatedAxios` that contain the prefix for the url and the user jwt for authentication in the backend

### `adminAddCompanyAction`

1. open a try catch block
2. inside the try block making a post request with the `companyObj` that
   recevied from the form of add `<AddCompanyBox/>`
3. if response status is 201 (created) then the add made successfuly and

   - trigger the redux store state to rerender and getting all companies immediatly
   - reset the add mode to close the `<AddCompanyBox/>` component

4. if response status is not 201 then add is failed and inside the catch block error messege trigger
   for the user to try again

### `adminDeleteCompanyAction`

### `adminGetAllCompaniesAction`

### `adminUpdateCompanyAction`
