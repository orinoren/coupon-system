# `ADMIN MAIN FUNCTIONS`

## Methods :

1. `getMainSearchFormForCustomer` :
   returns `<MainSearchForm/>` with placeholder of customer.

2. `getMainSearchFormForCompany` :
   returns `<MainSearchForm/>` with placeholder of company.

3. `getCloseOperationButtonFunc` :
   returns `<OpertaionsButton/>` with onClick that activate:

- `resetAddMode`
- `resetOpAction` -> to close the `<AdminOperationsContainer/>`
- `resetSearchModeAction` -> to reset the search details for future opertions to start clean.

4. `getOperationsButtonForCustomerFunc` :  
    checks if isCustomerMode if true
   returns `<OpertaionsButton/>` with onClick that activate:

- `handleOnAddCustomerClicked` -> adding a form to enter a new customer
- `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
- `showCustomerOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer

if false returns `<OpertaionsButton/>` with onClick that activate:

- `resetAddMode`
- `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
- `showCustomerOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer

5. `getOperationsButtonForCompanyFunc` :  
    checks if isCompanyMode if true
   returns `<OpertaionsButton/>` with onClick that activate:

- `handleOnAddCompanyClicked` -> adding a form to enter a new company
- `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
- `showCompanyOpAction` -> to show `<AdminOperationsContainer/>` for Company

if false returns `<OpertaionsButton/>` with onClick that activate:

- `resetAddMode`
- `resetSearchModeAction` -> to reset the search details for future opertions to start clean.
- `showCompanyOpAction` -> to show `<AdminOperationsContainer/>` for Cusotmer
