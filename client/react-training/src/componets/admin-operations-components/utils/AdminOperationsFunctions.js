import AdminCustomerBox from "../admin-operations-container/admin-operation-box/AdminCustomerBox";
import AdminCompanyBox from "../admin-operations-container/admin-operation-box/AdminCompanyBox";

export const getAllCompaniesBoxesFunc = (
  isSearchMode,
  allCompaniesSearchResult,
  allCompanies
) => {
  if (isSearchMode) {
    return allCompaniesSearchResult?.map((company) => {
      return (
        <AdminCompanyBox
          key={company.company_id}
          id={company.company_id}
          name={company.name}
          email={company.email}
          password={company.password}
        />
      );
    });
  } else {
    return allCompanies.map((company) => {
      return (
        <AdminCompanyBox
          key={company.company_id}
          id={company.company_id}
          name={company.name}
          email={company.email}
          password={company.password}
        />
      );
    });
  }
};
export const getAllCustomersBoxesFunc = (
  isSearchMode,
  allCustomerSearchResult,
  allCustomers
) => {
  if (isSearchMode) {
    return allCustomerSearchResult?.map((customer) => {
      return (
        <AdminCustomerBox
          key={customer.id}
          id={customer.id}
          firstName={customer.first_name}
          lastName={customer.last_name}
          email={customer.email}
          password={customer.password}
        />
      );
    });
  } else {
    return allCustomers.map((customer) => {
      return (
        <AdminCustomerBox
          key={customer.id}
          id={customer.id}
          firstName={customer.first_name}
          lastName={customer.last_name}
          email={customer.email}
          password={customer.password}
        />
      );
    });
  }
};
