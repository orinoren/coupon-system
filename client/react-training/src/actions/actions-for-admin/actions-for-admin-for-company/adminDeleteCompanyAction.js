import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/delete-company";

export const adminDeleteCompanyAction =
  (companyId) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: companyId },
    };
    try {
      await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, updateConfig);
      dispatch({ type: "DELETE-COMPANY", payload: companyId });
    } catch (error) {}
  };
