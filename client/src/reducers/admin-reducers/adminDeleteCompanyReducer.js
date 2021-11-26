const initialState = {
  company_id: 0,
};

const adminDeleteCompanyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "DELETE-COMPANY":
      return { ...state, company_id: payload };

    default:
      return state;
  }
};
export default adminDeleteCompanyReducer;
