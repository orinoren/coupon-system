import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/customers";

export const adminGetAllCustomersAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    if (res.status === 200) {
      dispatch({
        type: "GET-ALL-CUSTOMERS",
        payload: res.data,
      });
    }
  } catch (error) {}
};
