import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/customer";
export const adminDeleteCustomerAction =
  (customerId) => async (dispatch, getState) => {
    const deleteConfig = {
      params: { id: customerId },
    };
    try {
      await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, deleteConfig);
      dispatch({ type: "DELETE-CUSTOMER", payload: customerId });
    } catch (error) {}
  };
