import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetAddMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/company";

export const adminAddCompanyAction =
  (companyObj, server_error_for_add_company) => async (dispatch) => {
    try {
      const res = await authenticatedAxios
        .getAuthenticatedAxios()
        .post(urlSuffix, companyObj);
      if (res.status === 201) {
        dispatch({ type: "ADD-COMPANY", payload: res.data });
        dispatch(adminResetAddMode());
      }
    } catch (error) {
      server_error_for_add_company.current.textContent =
        error.response.data.messege;
    }
  };
