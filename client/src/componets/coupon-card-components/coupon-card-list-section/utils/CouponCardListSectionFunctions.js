import {
  resetSearchModeAction,
  resetShowCustomerCouponsAction,
} from "../../../../actions/actions-for-ui/action-for-ui";

export const getCouponListFunc = (
  title,
  allCoupons,
  allCompanyCoupons,
  allCustomerCoupons,
  searchResultCouponList
) => {
  switch (title) {
    case "TOP COUPONS":
      return allCoupons;
    case "Your Coupons(COMPANY)":
      return allCompanyCoupons;
    case "Your Coupons(CUSTOMER)":
      return allCustomerCoupons;
    case "FOOD":
      return allCoupons.filter((coupon) => coupon.category === 1);
    case "ELECTRICITY":
      return allCoupons.filter((coupon) => coupon.category === 2);
    case "RESTAURANT":
      return allCoupons.filter((coupon) => coupon.category === 3);
    case "VACATION":
      return allCoupons.filter((coupon) => coupon.category === 4);
    case "HOME PRODUCTS":
      return allCoupons.filter((coupon) => coupon.category === 5);
    case "CLOTHING PRODUCTS":
      return allCoupons.filter((coupon) => coupon.category === 6);
    case "Result":
      return searchResultCouponList;
    default:
      break;
  }
};
export const getCardListSectionControllersFunc = (
  setNumberOfCouponsToShow,
  numberOfCouponsToShow,
  searchMode,
  showCustomerCoupons,
  title,
  dispatch
) => {
  return (
    <div>
      <span className="px-2">see</span>
      <span
        className="main-page-see-more"
        onClick={() =>
          handleSeeMoreClicked(setNumberOfCouponsToShow, numberOfCouponsToShow)
        }
      >
        more
      </span>
      /
      <span
        className="main-page-see-less"
        onClick={() =>
          handleSeeLessClicked(setNumberOfCouponsToShow, numberOfCouponsToShow)
        }
      >
        less
      </span>
      {getExitButton(searchMode, showCustomerCoupons, title, dispatch)}
    </div>
  );
};
const getExitButton = (searchMode, showCustomerCoupons, title, dispatch) => {
  if (searchMode || showCustomerCoupons) {
    return (
      <i
        onClick={() =>
          handleExitCouponListSectionButtonClicked(title, dispatch)
        }
        className=" far px-4 fs-2 text-success fa-times-circle"
      ></i>
    );
  }
  return "";
};
const handleSeeMoreClicked = (
  setNumberOfCouponsToShow,
  numberOfCouponsToShow
) => {
  setNumberOfCouponsToShow({
    ...numberOfCouponsToShow,
    clicked: true,
    amount: numberOfCouponsToShow.amount + 6,
  });
};
const handleSeeLessClicked = (
  setNumberOfCouponsToShow,
  numberOfCouponsToShow
) => {
  if (numberOfCouponsToShow.amount !== 6) {
    setNumberOfCouponsToShow({
      ...numberOfCouponsToShow,
      clicked: true,
      amount: numberOfCouponsToShow.amount - 6,
    });
  }
};
const handleExitCouponListSectionButtonClicked = (title, dispatch) => {
  if (title === "Result") {
    dispatch(resetSearchModeAction());
    return;
  }
  dispatch(resetShowCustomerCouponsAction());
};
