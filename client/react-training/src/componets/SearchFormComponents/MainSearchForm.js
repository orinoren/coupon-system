import React from "react";
import "./MainSearchForm.css";
import { useDispatch, useSelector } from "react-redux";
import { searchModeAction } from "../../actions/actions-for-ui/action-for-ui";
import { useRef } from "react";
import SortBox from "./SortBox";
import { useState } from "react";
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
  const showOp = useSelector(
    (state) => state.uiRootReducer.showOpForAdminReducer
  );
  const allCompanyCoupons = useSelector(
    (state) =>
      state.companyRootReducer.companyGetAllCouponsReducer.companyCoupons
  );
  const userDetails = useSelector((state) => state.authReducer);

  const searchInput = useRef();
  const handleSearchBtnClicked = () => {
    dispatch(searchModeAction());
    let isSearchWithSort = false;
    const maxPrice = document.getElementById("max-price-input")?.value;
    const checkedInputs = [];
    const sortInputs = document.querySelectorAll(".sort-input");
    sortInputs.forEach((input) =>
      input.checked ? (isSearchWithSort = true) : ""
    );
    if (isSearchWithSort) {
      sortInputs.forEach((input) => {
        if (input.checked) {
          checkedInputs.push(input.id);
        }
      });
      if (userDetails.role === "COMPANY") {
        const searchResultCompanyCouponsList = allCompanyCoupons.filter(
          (coupon) =>
            coupon.title
              .toLowerCase()
              .includes(searchInput.current.value.toLowerCase()) &&
            checkedInputs.includes(coupon.category_id) &&
            coupon.price <= maxPrice
        );

        dispatch({
          type: "SEARCH-RESULT-COUPON-LIST",
          payload: searchResultCompanyCouponsList,
        });
      } else {
        const searchResultCouponsList = allCoupons.filter(
          (coupon) =>
            coupon.title
              .toLowerCase()
              .includes(searchInput.current.value.toLowerCase()) &&
            checkedInputs.includes(coupon.category_id + "") &&
            coupon.price <= maxPrice
        );

        dispatch({
          type: "SEARCH-RESULT-COUPON-LIST",
          payload: searchResultCouponsList,
        });
      }
      setShowSortBox(false);
      /**/
    } else {
      if (userDetails.role === "ADMIN") {
        if (showOp.companyOp) {
          const searchResultCompanyList = allCompanies.filter((company) =>
            company.name
              .toLowerCase()
              .includes(searchInput.current.value.toLowerCase())
          );
          dispatch({
            type: "SEARCH-RESULT-COMAPNY-LIST",
            payload: searchResultCompanyList,
          });
        } else if (showOp.customerOp) {
          const searchResultCustomerList = allCustomers.filter(
            (customer) =>
              customer.first_name
                .toLowerCase()
                .includes(searchInput.current.value.toLowerCase()) ||
              customer.last_name
                .toLowerCase()
                .includes(searchInput.current.value.toLowerCase())
          );

          dispatch({
            type: "SEARCH-RESULT-CUSTOMER-LIST",
            payload: searchResultCustomerList,
          });
        } else {
          const searchResultCouponsList = allCoupons.filter((coupon) =>
            coupon.title
              .toLowerCase()
              .includes(searchInput.current.value.toLowerCase())
          );

          dispatch({
            type: "SEARCH-RESULT-COUPON-LIST",
            payload: searchResultCouponsList,
          });
        }
      } else if (userDetails.role === "COMPANY") {
        const searchResultCompanyCouponsList = allCompanyCoupons.filter(
          (coupon) =>
            coupon.title
              .toLowerCase()
              .includes(searchInput.current.value.toLowerCase())
        );

        dispatch({
          type: "SEARCH-RESULT-COUPON-LIST",
          payload: searchResultCompanyCouponsList,
        });
      } else {
        const searchResultCouponsList = allCoupons.filter((coupon) =>
          coupon.title
            .toLowerCase()
            .includes(searchInput.current.value.toLowerCase())
        );

        dispatch({
          type: "SEARCH-RESULT-COUPON-LIST",
          payload: searchResultCouponsList,
        });
      }
    }
  };
  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchBtnClicked(e);
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
            onClick={() => handleSearchBtnClicked()}
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
            onClick={() => handleSearchBtnClicked()}
          >
            <i class="fas fa-search"></i>
          </span>
        </div>
      </form>
    </div>
  );
};

export default MainSearchForm;
