import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/get-all-companies";

export const adminGetAllCompaniesAction = () => async (dispatch, getState) => {
  try {
    const res = await authenticatedAxios.getAuthenticatedAxios().get(urlSuffix);
    if (res.status === 200) {
      dispatch({
        type: "GET-ALL-COMPANIES",
        payload: res.data,
      });
    }
  } catch (error) {}
};
