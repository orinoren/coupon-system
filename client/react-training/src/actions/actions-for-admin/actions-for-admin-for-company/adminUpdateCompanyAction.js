import authenticatedAxios from "../../../service/AuthenticatedAxios";
const urlSuffix = "admin/update-company";

export const adminUpdateCompanyAction =
  (companyObj) => async (dispatch, getState) => {
    console.log(companyObj);
    const updateConfig = {
      params: { id: companyObj.company_id },
    };
    console.log("here");
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, companyObj, updateConfig);
      dispatch({ type: "UPDATE-COMPANY", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
