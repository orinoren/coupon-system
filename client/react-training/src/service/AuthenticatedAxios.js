import axios from "axios";

class AuthenticatedAxios {
  constructor() {
    this.token = null;
  }

  setUserToken = (tokenAssign) => {
    this.token = tokenAssign;
  };

  getAuthenticatedAxios() {
    return axios.create({
      baseURL: "http://localhost:8081/",
      headers: { Authorization: this.token },
    });
  }
}

const authenticatedAxiosObj = new AuthenticatedAxios();

export default authenticatedAxiosObj;
