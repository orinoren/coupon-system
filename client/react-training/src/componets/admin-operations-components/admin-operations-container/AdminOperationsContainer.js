import React from "react";
import AdminCompanyBox from "../admin-operation-box/AdminCompanyBox";
import { useSelector } from "react-redux";
import AdminCustomerBox from "../admin-operation-box/AdminCustomerBox";
import {
  getAllCompaniesBoxesFunc,
  getAllCustomersBoxesFunc,
} from "../utils/AdminOperationsFunctions";
const AdminOperationsContainer = () => {
  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );

  const allCompanies = useSelector(
    (state) => state.adminRootReducer.adminGetAllCompaniesReducer.allCompanies
  );
  const allCustomers = useSelector(
    (state) => state.adminRootReducer.adminGetAllCustomersReducer.allCustomers
  );
  const isSearchMode = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );

  const allCustomersSearchResult = useSelector(
    (state) => state.uiRootReducer.searchResultCustomerListReducer.customerList
  );

  const allCompaniesSearchResult = useSelector(
    (state) => state.uiRootReducer.searchResultCompanyListReducer.companyList
  );
  const showCompanyBoxToAdd = useSelector(
    (state) => state.uiRootReducer.adminAddModeOpReducer.addCompanyMode
  );
  const showCustomerBoxToAdd = useSelector(
    (state) => state.uiRootReducer.adminAddModeOpReducer.addCustomerMode
  );

  const getAllCompaniesBoxes = () => {
    return getAllCompaniesBoxesFunc(
      isSearchMode,
      allCompaniesSearchResult,
      allCompanies
    );
  };
  const getAllCustomersBoxes = () => {
    return getAllCustomersBoxesFunc(
      isSearchMode,
      allCustomersSearchResult,
      allCustomers
    );
  };
  const getAddBox = () => {
    if (showCompanyBoxToAdd && showOperationsFor.companyOp) {
      return <AdminCompanyBox addCompanyMode={true} />;
    }
    if (showCustomerBoxToAdd && showOperationsFor.customerOp) {
      return <AdminCustomerBox addCustomerMode={true} />;
    }
    return "";
  };

  return (
    <div>
      <div className="container-fluid bg-light mt-1 mt-md-5">
        <div className="row justify-content-center ">
          <div className="col-12">
            {getAddBox()}
            <div>
              {showOperationsFor.companyOp
                ? getAllCompaniesBoxes()
                : getAllCustomersBoxes()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOperationsContainer;
