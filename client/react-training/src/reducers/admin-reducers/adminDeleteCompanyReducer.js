const initialState = {
  companyId: 0,
};

const adminDeleteCompanyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "DELETE-COMPANY":
      return { ...state, companyId: payload };

    default:
      return state;
  }
};
export default adminDeleteCompanyReducer;
