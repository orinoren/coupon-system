import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/customer";
export const adminDeleteCustomerAction =
  (customerId) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: customerId },
    };
    try {
      await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, updateConfig);
      dispatch({ type: "DELETE-CUSTOMER", payload: customerId });
    } catch (error) {}
  };
