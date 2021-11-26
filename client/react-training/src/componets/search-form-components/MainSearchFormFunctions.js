export const checkIfSearchWithSort = () => {
  let isSearchWithSort = false;
  const checkedCategoryInputs = [];
  const categorySortInputs = document.querySelectorAll(".sort-input");

  for (let i = 0; i < categorySortInputs.length; i++) {
    const input = categorySortInputs[i];
    if (input.checked) {
      isSearchWithSort = true;
      checkedCategoryInputs.push(input.id);
    }
  }
  return { isSearchWithSort, checkedCategoryInputs };
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
  companyCouponList,
  couponList,
  searchInput,
  checkedCategoryInputs,
  maxPrice,
  role,
  dispatch
) => {
  if (role === "COMPANY") {
    const searchResultCompanyCouponsList = companyCouponList.filter(
      (coupon) =>
        coupon.title
          .toLowerCase()
          .includes(searchInput.current.value.toLowerCase()) &&
        checkedCategoryInputs.includes(coupon.category) &&
        coupon.price <= maxPrice
    );
    dispatch({
      type: "SEARCH-RESULT-COUPON-LIST",
      payload: searchResultCompanyCouponsList,
    });
  } else {
    const searchResultCouponsList = couponList.filter(
      (coupon) =>
        coupon.title
          .toLowerCase()
          .includes(searchInput.current.value.toLowerCase()) &&
        checkedCategoryInputs.includes(coupon.category + "") &&
        coupon.price <= maxPrice
    );

    dispatch({
      type: "SEARCH-RESULT-COUPON-LIST",
      payload: searchResultCouponsList,
    });
  }
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
