const initiatlState = {
  allCompanies: [],
};
const adminGetAllCompaniesReducer = (state = initiatlState, action) => {
  switch (action.type) {
    case "GET-ALL-COMPANIES":
      return { ...state, allCompanies: action.payload };
    default:
      return state;
  }
};
export default adminGetAllCompaniesReducer;
