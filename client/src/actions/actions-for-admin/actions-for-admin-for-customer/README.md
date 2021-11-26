## `Actions for admin for customer`

- All actions using using `AuthenticatedAxios` that contain the prefix for the url and the user jwt for authentication in the backend
- All actions are made inside a try catch block

### `Admin add cusotmer action`

1. Inside the try block making a post request with the `customerObj` that
   recevied from the form of add `<AddCustomerBox/>`
2. If response status is 201 (created) then the add made successfuly and

   - Trigger the redux store state to rerender and getting all the customers immediatly
   - Reset the add mode to close the `<AddCustomerBox/>` component

3. If response status is not 201 then add is failed and inside the catch block error messege trigger for the user to try again

### `Admin delete cusotmer action`

1. `deleteCusotmerConfig` contain the customer id for delete and pass as a param in the delete http request to the backend
2. if the response status is 200 (OK) then the delete made successfuly and
   - Trigger the redux store state to rerender and getting all the customers immediatly

### `Admin get all customers action`

1. making a get http request
2. if resonse status is 200 (OK) then the get made successfuly and
   - Trigger the redux store state to rerender and getting all the customers immediatly

### `Admin update cusotmer action`

1. Inside the try block making a put request with the `CusotmerObj` that
   recevied from the form of add `<UpdateCusotmerBox/>`
2. If response status is 201 (created) then the add made successfuly and
   - Trigger the redux store state to rerender and getting all the customers immediatly
   - Reset the Update mode
   - Set updateMode to false to close only the relavent `<UpdateCusotmerBox/>` component
3. If response status is not 201 then add is failed and inside the catch block error messege
   trigger for the user to try again
