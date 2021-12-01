import axios from "axios";
import authenticatedAxios from "../service/AuthenticatedAxios";

const url = "http://localhost:8081/login";

export const loginAction = (loginDetails) => async (dispatch) => {
  try {
    const res = await axios.post(url, loginDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      authenticatedAxios.setUserToken(res.headers.authorization);
      localStorage.setItem("Jwt", res.headers.authorization);
      localStorage.setItem("Role", res.headers.role);
      dispatch({
        type: "LOGIN-SUCCEED",
        payload: {
          token: res.headers.authorization,
          role: res.headers.role,
        },
      });
    }
  } catch (error) {
    dispatch({ type: "LOGIN-FAILED" });
  }
};
