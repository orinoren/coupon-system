import axios from "axios";
const token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBeGUiLCJ1c2VySWQiOjIsInJvbGUiOiJDT01QQU5ZIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2xvZ2luIiwiaWF0IjoxNjMzMDM1NjAwLCJleHAiOjE2MzU2Mjc2MDB9.VqUz8eZVInxiyUI_6M-a4INa9jw555aLp4x_6hT_7w4`;

const url = "http://localhost:8081/company/delete-coupon";
export const companyDeleteCouponAction =
  (coupon_id) => async (dispatch, getState) => {
    const deleteConfig = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      params: { id: coupon_id },
    };
    try {
      const res = await axios.delete(url, deleteConfig);
      if (res.status === 200) {
        dispatch({ type: "DELETE-COUPON", payload: coupon_id });
      }
    } catch (error) {}
  };
