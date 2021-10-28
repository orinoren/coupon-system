import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/get-all-customers";

export const adminGetAllCustomersAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);

    dispatch({
      type: "GET-ALL-CUSTOMERS",
      payload: res.data,
    });
  } catch (error) {}
};
