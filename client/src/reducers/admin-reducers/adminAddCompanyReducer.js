const initialState = {
  name: " ",
  email: " ",
  password: " ",
};

const adminAddCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-COMPANY":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default adminAddCompanyReducer;
