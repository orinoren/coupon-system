const initialState = {
  role: " ",
  token: "",
  logged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN-SUCCEED":
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token,
        logged: true,
      };
    case "LOGIN-FAILED":
      return { ...state };
    case "LOGOUT":
      return { ...state, role: "", token: "", logged: false };
    default:
      return state;
  }
};

export default authReducer;
