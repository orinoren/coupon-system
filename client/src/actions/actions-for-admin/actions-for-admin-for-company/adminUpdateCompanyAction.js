import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetUpdateMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/company";

export const adminUpdateCompanyAction =
  (companyObj, setUpdateMode) => async (dispatch, getState) => {
    const updateConfig = {
      params: { id: companyObj.company_id },
    };
    console.log("here");
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, companyObj, updateConfig);
      if (res.status === 200) {
        dispatch({ type: "UPDATE-COMPANY", payload: res.data });
        dispatch(adminResetUpdateMode());
        setUpdateMode(false);
      }
    } catch (error) {
      console.log(error.response.data);
      document.getElementById("server-error-for-update-company").textContent =
        error.response.data;
    }
  };
