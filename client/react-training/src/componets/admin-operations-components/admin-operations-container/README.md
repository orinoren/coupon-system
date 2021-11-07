# `Admin Operations Container`

## useSelectors

1. `showOperationsFor`: determine of which operations to show for customers or companies and let us know on whice mode administrator is in .
2. `allCompanies` : contains all companies.
3. `allCustomers` : contains all customers.
4. `isSearchMode` : determine if admin is on search mode to show the search result .
5. `allCustomersSearchResult` : conatins all of the customers that match the admin search input.
6. `allCompaniesSearchResult` : conatins all of the companies that match the admin search input.
7. `showCompanyBoxToAdd` : determine if to show company add box to enable adding company.
8. `showCustomerBoxToAdd` :determine if to show customer add box to enable adding customer.

## Methods

1. `getAllCompaniesBoxes` : return `getAllCompaniesBoxesFunc()` to retrive the wanted all companies
2. `getAllCustomersBoxes` : return `getAllCustomersBoxesFunc()` to retrive the wanted all customers

3. `getAddBox` : if `showCompanyBoxToAdd` and `showOperationsFor.companyOp`<br/>
   returns `<AdminCompanyBox addCompanyMode={true} />` to let the component know its need to be an add box.<br/>
   if `showCustomerBoxToAdd` and `showOperationsFor.customerOp`<br/> returns `<AdminCustomerBox addCustomerMode={true} />` to let the component know its need to be an add box
