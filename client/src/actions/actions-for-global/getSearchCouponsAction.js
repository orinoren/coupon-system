import axios from "axios";
import { convertArrayToDate } from "./getAllCouponsAction";
import { searchModeAction } from "../actions-for-ui/action-for-ui";
const url = "http://localhost:8081/global/search/";

export const getSearchCouponsAction =
  (searchInput, maxPrice, checkedCategoryInputs) => async (dispatch) => {
    try {
      let searchCouponsResult;
      if (maxPrice && checkedCategoryInputs) {
        const res = await axios.get(
          url + searchInput + "/" + maxPrice + "/" + checkedCategoryInputs
        );
        searchCouponsResult = res.data;
      } else {
        const res = await axios.get(url + searchInput);
        searchCouponsResult = res.data;
      }
      for (let i = 0; i < searchCouponsResult.length; i++) {
        const coupon = searchCouponsResult[i];
        coupon.startDate = convertArrayToDate(coupon.startDate);
        coupon.endDate = convertArrayToDate(coupon.endDate);
      }
      console.log(searchCouponsResult);
      dispatch({
        type: "SEARCH-RESULT-COUPON-LIST",
        payload: searchCouponsResult,
      });
      dispatch(searchModeAction());
    } catch (error) {}
  };
