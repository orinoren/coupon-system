import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/add-company";

export const adminAddCompanyAction =
  (companyObj) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, companyObj);
      dispatch({ type: "ADD-COMPANY", payload: res.data });
    } catch (error) {}
  };
