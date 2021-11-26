class LoginService {
  Token = null;
  setToken = (token) => {
    this.Token = token;
  };
  getUserToken = () => this.Token;
}
const loginService = new LoginService();
export default loginService;
