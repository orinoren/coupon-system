import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/customer";
export const adminUpdateCustomerAction =
  (customerObj, setUpdateMode, server_error_for_update_customer) =>
  async (dispatch) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, customerObj);
      if (res.status === 200) {
        dispatch({ type: "UPDATE-CUSTOMER", payload: res.data });
        setUpdateMode(false);
      }
    } catch (error) {
      server_error_for_update_customer.current.textContent =
        error.response.data;
    }
  };
