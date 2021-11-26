import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/customer";
export const adminUpdateCustomerAction =
  (customerObj, setUpdateMode) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: customerObj.id },
    };
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, customerObj, updateConfig);
      if (res.status === 200) {
        dispatch({ type: "UPDATE-CUSTOMER", payload: res.data });
        setUpdateMode(false);
      }
    } catch (error) {
      document.getElementById("server-error-for-update-customer").textContent =
        error.response.data;
    }
  };
