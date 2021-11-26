import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetAddMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/customer";

export const adminAddCustomerAction =
  (customerObj) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, customerObj);
      if (res.status === 201)
        dispatch({ type: "ADD-CUSTOMER", payload: res.data });
      dispatch(adminResetAddMode());
    } catch (error) {
      document.getElementById("server-error-for-add-customer").textContent =
        error.response.data;
    }
  };
