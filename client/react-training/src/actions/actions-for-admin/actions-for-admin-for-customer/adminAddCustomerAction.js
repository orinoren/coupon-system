import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/add-customer";

export const adminAddCustomerAction =
  (customerObj) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, customerObj);
      dispatch({ type: "ADD-CUSTOMER", payload: res.data });
    } catch (error) {}
  };
