import authenticatedAxios from "../../../service/AuthenticatedAxios";
import { adminResetAddMode } from "../../actions-for-ui/action-for-ui";
const urlSuffix = "admin/company";

export const adminAddCompanyAction = (companyObj) => async (dispatch) => {
  try {
    const res = await authenticatedAxios
      .getAuthenticatedAxios()
      .post(urlSuffix, companyObj);
    if (res.status === 201) {
      dispatch({ type: "ADD-COMPANY", payload: res.data });
      dispatch(adminResetAddMode());
    }
  } catch (error) {
    document.getElementById("server-error-for-add-company").textContent =
      error.response.data;
  }
};
