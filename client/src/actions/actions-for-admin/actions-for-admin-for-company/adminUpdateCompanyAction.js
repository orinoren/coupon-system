import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetUpdateMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/company";

export const adminUpdateCompanyAction =
  (companyObj, setUpdateMode) => async (dispatch, getState) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .put(urlSuffix, companyObj);
      if (res.status === 200) {
        dispatch({ type: "UPDATE-COMPANY", payload: res.data });
        dispatch(adminResetUpdateMode());
        setUpdateMode(false);
      }
    } catch (error) {
      document.getElementById("server-error-for-update-company").textContent =
        error.response.data;
    }
  };
