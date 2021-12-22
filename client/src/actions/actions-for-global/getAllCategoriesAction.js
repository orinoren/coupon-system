import axios from "axios";
const url = "http://localhost:8081/global/categories";

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    const res = await axios.get(url);
    const allCategories = res.data;
    dispatch({
      type: "GET-ALL-CATEGORIES",
      payload: allCategories,
    });
  } catch (error) {}
};
