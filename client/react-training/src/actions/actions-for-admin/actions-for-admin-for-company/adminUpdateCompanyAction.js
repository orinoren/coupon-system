import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/update-company";

export const adminUpdateCompanyAction =
  (companyObj) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: companyObj.company_id },
    };
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, companyObj, updateConfig);
      dispatch({ type: "UPDATE-COMPANY", payload: res.data });
    } catch (error) {}
  };
