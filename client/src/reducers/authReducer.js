const initialState = {
  role: " ",
  token: "",
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN-SUCCEED":
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token,
        isLogged: action.payload.isLogged,
      };
    case "LOGIN-FAILED":
      return { ...state };
    case "LOGOUT":
      return { ...state, role: "", token: "", isLogged: false };
    default:
      return state;
  }
};

export default authReducer;
