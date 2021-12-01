import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetAddMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/customer";

export const adminAddCustomerAction =
  (customerObj, server_error_for_add_customer) => async (dispatch) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, customerObj);
      if (res.status === 201)
        dispatch({ type: "ADD-CUSTOMER", payload: res.data });
      dispatch(adminResetAddMode());
    } catch (error) {
      server_error_for_add_customer.current.textContent =
        error.response.data.messege;
    }
  };
