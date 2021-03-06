import React from "react";
import "./MainSearchForm.css";
import { useDispatch, useSelector } from "react-redux";
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
import { getSearchCouponsAction } from "../../actions/actions-for-global/getSearchCouponsAction";
import { getSearchCompanyCouponsAction } from "../../actions/actions-for-company/getSearchCompanyCouponsAction";
import { getSearchCustomerCouponsAction } from "../../actions/actions-for-customer/getSearchCustomerCouponsAction";
import { searchModeAction } from "../../actions/actions-for-ui/action-for-ui";
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
  const showCustomerCoupons = useSelector(
    (state) =>
      state.uiRootReducer.showCustomerCouponsReducer.showCustomerCoupons
  );

  const userDetails = useSelector((state) => state.authReducer);

  const searchInput = useRef();
  const maxPriceRef = useRef();
  const sortInputRef = useRef();

  const handleSearchButtonClicked = () => {
    const { isSearchWithSort, checkedCategoryInputs } = checkIfSearchWithSort(
      sortInputRef,
      maxPriceRef
    );
    if (isSearchWithSort) {
      const maxPrice = maxPriceRef.current.value;
      dispatchSortedSearchResultCouponList(
        searchInput,
        checkedCategoryInputs,
        maxPrice,
        userDetails.role,
        showCustomerCoupons,
        dispatch
      );
      setShowSortBox(false);
      return;
    }

    //search without sort
    switch (userDetails.role) {
      case "ADMIN":
        //admin search for company
        if (showOperationsFor.companyOp) {
          dispatchAdminSearchResultForCompanies(
            allCompanies,
            searchInput,
            dispatch
          );
          dispatch(searchModeAction());
          return;
        }
        //admin search for customer
        if (showOperationsFor.customerOp) {
          dispatchAdminSearchResultForCustomers(
            allCustomers,
            searchInput,
            dispatch
          );
          dispatch(searchModeAction());
          return;
        }
        dispatchSearchResultCouponList(allCoupons, searchInput, dispatch);
        break;
      case "COMPANY":
        //company search in their coupons
        dispatch(getSearchCompanyCouponsAction(searchInput.current.value));
        break;
      default:
        //guest or customer search all coupons
        if (showCustomerCoupons) {
          dispatch(getSearchCustomerCouponsAction(searchInput.current.value));
          break;
        }

        dispatch(getSearchCouponsAction(searchInput.current.value));
        break;
    }
    setShowSortBox(false);
  };
  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchButtonClicked(e);
        setShowSortBox(false);
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
          {showSortBox ? (
            <SortBox
              sortInputRef={sortInputRef}
              maxPriceRef={maxPriceRef}
            ></SortBox>
          ) : (
            ""
          )}
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
