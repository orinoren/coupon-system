import { getSearchCompanyCouponsAction } from "../../actions/actions-for-company/getSearchCompanyCouponsAction";
import { getSearchCustomerCouponsAction } from "../../actions/actions-for-customer/getSearchCustomerCouponsAction";
import { getSearchCouponsAction } from "../../actions/actions-for-global/getSearchCouponsAction";
export const checkIfSearchWithSort = (sortInputRef, maxPriceRef) => {
  const checkedCategoryInputs = [];
  if (maxPriceRef.current?.value > 0) {
    let isSearchWithSort = false;

    const categorySortInputs =
      sortInputRef.current?.querySelectorAll(".sort-input");
    if (categorySortInputs) {
      for (let i = 0; i < categorySortInputs.length; i++) {
        const input = categorySortInputs[i];
        if (input.checked) {
          isSearchWithSort = true;
          checkedCategoryInputs.push(input.id);
        }
      }
      return { isSearchWithSort, checkedCategoryInputs };
    }
  }
  return { isSearchWithSort: false, checkedCategoryInputs };
};

export const dispatchSearchResultCouponList = (
  couponList,
  searchInput,
  dispatch
) => {
  const searchResultCouponsList = couponList.filter((coupon) =>
    coupon.title.toLowerCase().includes(searchInput.current.value.toLowerCase())
  );
  dispatch({
    type: "SEARCH-RESULT-COUPON-LIST",
    payload: searchResultCouponsList,
  });
};

export const dispatchSortedSearchResultCouponList = (
  searchInput,
  checkedCategoryInputs,
  maxPrice,
  role,
  showCustomerCoupons,
  dispatch
) => {
  if (role === "COMPANY") {
    dispatch(
      getSearchCompanyCouponsAction(
        searchInput.current.value,
        maxPrice,
        checkedCategoryInputs
      )
    );
    return;
  }
  if (role === "CUSTOMER" && showCustomerCoupons) {
    dispatch(
      getSearchCustomerCouponsAction(
        searchInput.current.value,
        maxPrice,
        checkedCategoryInputs
      )
    );
    return;
  }
  dispatch(
    getSearchCouponsAction(
      searchInput.current.value,
      maxPrice,
      checkedCategoryInputs
    )
  );
};
export const dispatchAdminSearchResultForCompanies = (
  allCompanies,
  searchInput,
  dispatch
) => {
  const searchResultCompanyList = allCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchInput.current.value.toLowerCase())
  );
  dispatch({
    type: "SEARCH-RESULT-COMAPNY-LIST",
    payload: searchResultCompanyList,
  });
};
export const dispatchAdminSearchResultForCustomers = (
  allCustomers,
  searchInput,
  dispatch
) => {
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
};
