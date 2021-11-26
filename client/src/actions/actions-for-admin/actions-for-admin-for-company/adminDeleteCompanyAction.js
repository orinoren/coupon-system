import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/company";

export const adminDeleteCompanyAction = (company_id) => async (dispatch) => {
  const deleteCompanyConfig = {
    params: { id: company_id },
  };
  try {
    const res = await authenticatedAxios
      .getAuthenticatedAxios()
      .delete(urlSuffix, deleteCompanyConfig);
    if (res.status === 200) {
      dispatch({ type: "DELETE-COMPANY", payload: company_id });
    }
  } catch (error) {}
};
