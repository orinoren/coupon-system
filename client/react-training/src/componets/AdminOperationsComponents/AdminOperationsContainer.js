import React from "react";
import AdminCompanyBox from "./AdminCompanyBox";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AdminCustomerBox from "./AdminCustomerBox";

const AdminOperations = () => {
  const boxKind = useSelector(
    (state) => state.uiRootReducer.adminOpBoxTypeReducer.typeOfBox
  );

  const showOp = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const allCompanies = useSelector(
    (state) => state.adminRootReducer.adminGetAllCompaniesReducer.allCompanies
  );
  const allCustomers = useSelector(
    (state) => state.adminRootReducer.adminGetAllCustomersReducer.allCustomers
  );
  const searchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );

  const allCustomerSearchResult = useSelector(
    (state) => state.uiRootReducer.searchResultCustomerListReducer.customerList
  );

  const allCompaniesSearchResult = useSelector(
    (state) => state.uiRootReducer.searchResultCompanyListReducer.companyList
  );
  const addModeCompanyShowBox = useSelector(
    (state) => state.uiRootReducer.adminAddModeOpReducer.addCompanyMode
  );
  const addModeCustomerShowBox = useSelector(
    (state) => state.uiRootReducer.adminAddModeOpReducer.addCustomerMode
  );

  const [companyBoxContent, setCompanyBoxContent] = useState([...allCompanies]);
  const [customerBoxContent, setCustomerBoxContent] = useState([
    ...allCustomers,
  ]);

  useEffect(() => {
    setCompanyBoxContent([...allCompanies]);
    setCustomerBoxContent([...allCustomers]);
    return () => {};
  }, [
    allCompanies,
    allCustomers,
    allCompaniesSearchResult,
    allCustomerSearchResult,
  ]);
  return (
    <div>
      <div className="container-fluid bg-light mt-5">
        <div className="row justify-content-center ">
          <div className="col-12">
            <div>
              {addModeCompanyShowBox && boxKind === "company" ? (
                <AdminCompanyBox addCompanyMode={true} />
              ) : (
                " "
              )}
              {addModeCustomerShowBox && boxKind === "customer" ? (
                <AdminCustomerBox addCustomerMode={true} />
              ) : (
                " "
              )}
            </div>
            <div>
              {showOp.companyOp
                ? searchMode && showOp.companyOp
                  ? allCompaniesSearchResult?.map((company) => {
                      return (
                        <AdminCompanyBox
                          key={company.company_id}
                          id={company.company_id}
                          name={company.name}
                          email={company.email}
                          password={company.password}
                        />
                      );
                    })
                  : companyBoxContent.map((company) => {
                      return (
                        <AdminCompanyBox
                          key={company.company_id}
                          id={company.company_id}
                          name={company.name}
                          email={company.email}
                          password={company.password}
                        />
                      );
                    })
                : showOp.customerOp && searchMode
                ? allCustomerSearchResult?.map((customer) => {
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
                  })
                : customerBoxContent.map((customer) => {
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
                  })}
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOperations;
