const initialState = {
  company_id: " ",
  name: " ",
  email: " ",
  password: " ",
};

const adminUpdateCompanyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE-COMPANY":
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default adminUpdateCompanyReducer;
