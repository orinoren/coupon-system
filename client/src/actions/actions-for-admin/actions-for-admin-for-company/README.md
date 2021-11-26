## `actions-for-admin-for-company`

- All actions using using `AuthenticatedAxios` that contain the prefix for the url and the user jwt for authentication in the backend
- All actions are made inside a try catch block

### `adminAddCompanyAction`

1. Inside the try block making a post request with the `companyObj` that
   recevied from the form of add `<AddCompanyBox/>`
2. If response status is 201 (created) then the add made successfuly and
   - Trigger the redux store state to rerender and getting all the companies immediatly
   - Reset the add mode to close the `<AddCompanyBox/>` component
3. If response status is not 201 then add is failed and inside the catch block error messege trigger
   for the user to try again

### `adminDeleteCompanyAction`

1. `deleteCompanyConfig` contain the company id for delete and pass as a param in the delete http request to the backend
2. if the response status is 200 (OK) then the delete made successfuly and
   - Trigger the redux store state to rerender and getting all the companies immediatly

### `adminGetAllCompaniesAction`

1. making a get http request
2. if resonse status is 200 (OK) then the get made successfuly and
   - Trigger the redux store state to rerender and getting all the companies immediatly

### `adminUpdateCompanyAction`

1. Inside the try block making a put request with the `companyObj` that
   recevied from the form of add `<UpdateCompanyBox/>`
2. If response status is 201 (created) then the add made successfuly and
   - Trigger the redux store state to rerender and getting all the companies immediatly
   - Reset the Update mode
   - Set updateMode to false to close only the relavent `<UpdateCompanyBox/>` component
3. If response status is not 201 then add is failed and inside the catch block error messege
   trigger for the user to try again
