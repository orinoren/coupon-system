import React from "react";
import "./MainSearchForm.css";
import { useDispatch, useSelector } from "react-redux";
import { searchModeAction } from "../../actions/actions-for-ui/action-for-ui";
import { useRef } from "react";
import SortBox from "./SortBox";
import { useState } from "react";
import {
  checkIfSearchWithSort,
  dispatchAdminSearchResultForCompanies,
  dispatchAdminSearchResultForCustomers,
  dispatchSearchResultCouponList,
  dispatchSortedSearchResultCouponList,
} from "./MainSearchFormFunctions";
const MainSearchForm = (props) => {
  const dispatch = useDispatch();

  const [showSortBox, setShowSortBox] = useState(false);

  const allCompanies = useSelector(
    (state) => state.adminRootReducer.adminGetAllCompaniesReducer.allCompanies
  );
  const allCustomers = useSelector(
    (state) => state.adminRootReducer.adminGetAllCustomersReducer.allCustomers
  );
  const allCoupons = useSelector(
    (state) => state.getAllCouponsReducer.allCoupons
  );
  const showOperationsFor = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );
  const allCompanyCoupons = useSelector(
    (state) =>
      state.companyRootReducer.companyGetAllCouponsReducer.companyCoupons
  );
  const userDetails = useSelector((state) => state.authReducer);

  const searchInput = useRef();

  const handleSearchButtonClicked = () => {
    dispatch(searchModeAction());
    let { isSearchWithSort, checkedCategoryInputs } = checkIfSearchWithSort();
    if (isSearchWithSort) {
      const maxPrice = document.getElementById("max-price-input")?.value;
      dispatchSortedSearchResultCouponList(
        allCompanyCoupons,
        allCoupons,
        searchInput,
        checkedCategoryInputs,
        maxPrice,
        userDetails.role,
        dispatch
      );
      setShowSortBox(false);
      return;
    }
    //search without sort
    switch (userDetails.role) {
      case "ADMIN":
        if (showOperationsFor.companyOp) {
          dispatchAdminSearchResultForCompanies(
            allCompanies,
            searchInput,
            dispatch
          );
          return;
        }
        if (showOperationsFor.customerOp) {
          dispatchAdminSearchResultForCustomers(
            allCustomers,
            searchInput,
            dispatch
          );
          return;
        }
        dispatchSearchResultCouponList(allCoupons, searchInput, dispatch);
        break;
      case "COMPANY":
        dispatchSearchResultCouponList(
          allCompanyCoupons,
          searchInput,
          dispatch
        );
        break;
      default:
        dispatchSearchResultCouponList(allCoupons, searchInput, dispatch);
        break;
    }
  };
  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchButtonClicked(e);
      }}
      className="p-0 p-md-1 m-0 mt-2 mt-md-5"
    >
      <form onSubmit={(e) => e.preventDefault()} className="gy-5 d-flex  ">
        <div className="sort-div d-none d-md-inline col-1 offset-3">
          <button
            onClick={() => setShowSortBox(!showSortBox)}
            className="btn btn-outline-success my-main-sort-button  "
            type="button"
          >
            Sort
          </button>
          {showSortBox ? <SortBox></SortBox> : ""}
        </div>
        <div className="d-none d-md-inline col-2 col-xl-1">
          <button
            onClick={() => handleSearchButtonClicked()}
            className="btn my-main-search-button btn-outline-success w-75"
            type="button"
          >
            Search
          </button>
        </div>
        <div className="search-input-container d-md-inline col-11 col-md-3 ml-4">
          <input
            ref={searchInput}
            className="form-control me-2"
            type="search"
            placeholder={props.placeholder}
            aria-label="Search"
          />
        </div>
        <div className="col-1 p-1 text-center d-block d-md-none text-success border bg-light">
          <span
            className="search-icon"
            onClick={() => handleSearchButtonClicked()}
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
      </form>
    </div>
  );
};

export default MainSearchForm;
