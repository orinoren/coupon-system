# `AdminMain PAGE`

## useSelectors :

1. `showOperationsFor` : determine of which operations to show for customers or companies .

2. `addedCompany`/`addedCustomer`, `updatedCompany`/`updatedCustomer`,
   `deletedCompany`/`deletedCustomer` :

   contain the details of succesfull opertaion of company/customer by admin
   and assign in the dependency array of useEffect(seconed useEffect) to get all companies/customers
   from the databse and force rerender every time a successfull operation been made .

3. `userDetails` : contains all necessary details of the current login user
   and assign in the dependency array of useEffect(first useEffect) to force render in
   every change of userDetails.isLogged or userDetails.role

## useEffect :

1. `First useEffect` : checking on every change of userDetails.isLogged or userDetails.role
   if isLogged is true and userDetails.role is ADMIN if one of the condition
   is not satasfied useHistory routing the user to the Home page

2. `Second useEffect` : first time getting all customers and companies. and on every succesfull addedCompany/addedCustomer,
   updatedCompany/updatedCustomer, deletedCompany/deletedCustomer
   getting all companies/customers from the database
   and force rerender every time a successfull operation has been made

## Methods :

1. `getMainSearchForm` : using the `showOperationsFor` to determine if the search form is
   for customer search or company search or coupon search and then calling `getMainSearchFormForCustomer` or `getMainSearchFormForCompany`

2. `getOperationsButtonForCompany` / `getOperationsButtonForCustomer` :
   using the `showOperationsFor` to force change of the button
   determine by `showOperationsFor` if `showOperationsFor` company/customer
   the button wiil be for adding a company/customer
   if not so the button will change to company/customer opertaions

3. `getCloseOperationsButton` : using the `showOperationsFor` to check if one of the
   `showOperationsFor` parameter customer or company
   is activated and making the close opertaions
   button to appear

4. `getAllCustomerOrCompaniesForOpertions`:
   returns `<AdminOperationsConatiner/>` that conatins conatainer of
   all the customers/companies with controllers for operations or nothing determine by `showOperationsFor`
