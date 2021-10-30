import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/delete-company";

export const adminDeleteCompanyAction =
  (companyId) => async (dispatch, getState) => {
    const deleteCompanyConfig = {
      params: { id: companyId },
    };
    console.log(companyId);
    try {
      await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, deleteCompanyConfig);
      dispatch({ type: "DELETE-COMPANY", payload: companyId });
    } catch (error) {}
  };
