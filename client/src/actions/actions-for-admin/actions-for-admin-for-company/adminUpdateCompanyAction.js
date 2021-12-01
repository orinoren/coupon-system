import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetUpdateMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/company";

export const adminUpdateCompanyAction =
  (companyObj, setUpdateMode, server_error_for_update_company) =>
  async (dispatch, getState) => {
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
      server_error_for_update_company.current.textContent =
        error.response.data.messege;
    }
  };
