import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/update-customer";
export const adminUpdateCustomerAction =
  (customerObj) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: customerObj.id },
    };
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, customerObj, updateConfig);
      if (res.status === 200) {
        dispatch({ type: "UPDATE-CUSTOMER", payload: res.data });
      }
    } catch (error) {}
  };
