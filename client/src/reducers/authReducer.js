const initialState = {
  role: " ",
  token: "",
  isLogged: false,
  loginFailed: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN-SUCCEED":
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token,
        isLogged: action.payload.isLogged,
        loginFailed: false,
      };
    case "LOGIN-FAILED":
      return { ...state, loginFailed: true };
    case "LOGOUT":
      return {
        ...state,
        role: "",
        token: "",
        isLogged: false,
        loginFailed: false,
      };
    default:
      return state;
  }
};

export default authReducer;
