import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/delete-company";

export const adminDeleteCompanyAction =
  (companyId) => async (dispatch, getState) => {
    const deleteCompanyConfig = {
      params: { id: companyId },
    };
    console.log(companyId);
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .delete(urlSuffix, deleteCompanyConfig);
      if (res.status === 200) {
        dispatch({ type: "DELETE-COMPANY", payload: companyId });
      }
    } catch (error) {}
  };
