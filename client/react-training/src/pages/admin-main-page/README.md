# `AdminMain PAGE`

## useSelectors :

1. `showOperationsFor` : determine of which operations to show for customers or companies .

2. `addedCompany`/`addedCustomer`, `updatedCompany`/`updatedCustomer`,
   `deletedCompany`/`deletedCustomer` :

   contain the details of succesfull opertaion of company/customer by admin
   and assign in the dependency array of useEffect(seconed useEffect) to get all companies/customers
   from the databse and force rerender every time a successfull operation been made .

3. `loginDetails` : contains all necessary details of the current login user
   and assign in the dependency array of useEffect(first useEffect) to force render in
   every change of loginDetails.isLogged or loginDetails.role

## useEffect :

`First useEffect` : checking on every change of loginDetails.isLogged or loginDetails.role
if isLogged is true and loginDetails.role is ADMIN if one of the condition
is not satasfied useHistory routing the user to the Home page

`Second useEffect` : on every change of succesfull addedCompany/addedCustomer,
updatedCompany/updatedCustomer, deletedCompany/deletedCustomer
getting all companies/customers from the databse
and force rerender every time a successfull operation been made

## Methods :

`getMainSearchForm` : using the `showOperationsFor` to determine if the search form is
for customer search or company search or coupon search

`getOperationsButtonForCompany` / `getOperationsButtonForCustomer` :
using the `showOperationsFor` to force change of the button
determine by `showOperationsFor` if `showOperationsFor`.company/customer
the button wiil be for adding a company/customer
if not so the button will change to company/customer opertaions

`getCloseOperationsButton` : using the `showOperationsFor` to check if one of the
`showOperationsFor` parameter customer or company
is activated and making the close opertaions
button to appear

`getAllCustomerOrCompaniesForOpertions`:
returns `<AdminOperationsConatiner/>` that conatins conatainer of
all the customers/companies with controllers for operations or nothing determine by `showOperationsFor`

# -----------------------------

# `ADMIN MAIN FUNCTIONS`

## Methods :

`getMainSearchFormForCustomer` :
returns `<MainSearchForm/>` with placeholder of customer.

`getMainSearchFormForCompany` :
returns `<MainSearchForm/>` with placeholder of company.

`getCloseOperationButtonFunc` :
returns `<OpertaionsButton/>` with onClick that activate.

1. reset Add mode
2. reset `showOperationsFor` -> to close the `<AdminOperationsContainer/>`
3. resetSearchModeAction -> to reset the search details for future opertions to start clean.

`getOperationsButtonForCustomerFunc` :  
 checks if isCustomerMode if true
returns `<OpertaionsButton/>` with onClick that activate:

1. `handleOnAddCustomerClicked` -> adding a form to enter a new customer
2. `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
3. `showCustomerOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer

if false returns `<OpertaionsButton/>` with onClick that activate:

1. `reset Add Mode`
2. `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
3. `showCustomerOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer

`getOperationsButtonForCompanyFunc` :  
 checks if isCompanyMode if true
returns `<OpertaionsButton/>` with onClick that activate:

1. `handleOnAddCompanyClicked` -> adding a form to enter a new company
2. `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
3. `showCompanyOpAction` -> to show `<AdminOperationsContainer/>` for Company

if false returns `<OpertaionsButton/>` with onClick that activate:

1. `reset Add Mode`
2. `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
3. `showCompanyOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer
