import { companyResetSubmitCoupon } from "../../../actions/actions-for-ui/action-for-ui";
export const handleOnCouponChangeFunc = (
  e,
  property,
  couponObj,
  setCouponObj,
  setCategoryName,
  setImageView,
  defaultImage,
  submitMsgView,
  dispatch
) => {
  switch (property) {
    case "title":
      setCouponObj({ ...couponObj, title: e.target.value });
      break;
    case "category":
      if (e.target.value !== 0 && e.target.value !== "Choose...") {
        const categoryName = document.getElementById(e.target.value);
        setCategoryName(categoryName.textContent);
        setCouponObj({ ...couponObj, category_id: e.target.value });
      }
      break;
    case "description":
      setCouponObj({ ...couponObj, description: e.target.value });
      break;
    case "startDate":
      setCouponObj({ ...couponObj, startDate: e.target.value });
      break;
    case "endDate":
      setCouponObj({ ...couponObj, endDate: e.target.value });
      break;
    case "amount":
      setCouponObj({ ...couponObj, amount: e.target.value });
      break;
    case "price":
      setCouponObj({ ...couponObj, price: e.target.value });
      break;
    case "image":
      if (e.target.files.length > 0) {
        const src = URL.createObjectURL(e.target.files[0]);
        setImageView(src);
        setCouponObj({
          ...couponObj,
          image: e.target.files[0],
        });
      }
      break;

    case "clear-form":
      setCouponObj({
        ...couponObj,
        title: "Title",
        category_id: 0,
        description: "description",
        startDate: "",
        endDate: "",
        amount: "",
        price: "",
      });
      setImageView(defaultImage);
      const allInputs = document.querySelectorAll(".form-control-coupon");
      const allErrorInputsMsg = document.querySelectorAll(
        ".coupon-input-error"
      );
      allErrorInputsMsg.forEach((msg) => (msg.textContent = ""));
      allInputs.forEach((input) => (input.value = " "));
      document.querySelector(
        ".inline-form-custom-select-coupon"
      ).selectedIndex = 0;
      setCategoryName("Category");
      if (submitMsgView) {
        dispatch(companyResetSubmitCoupon());
      }
      break;

    default:
      break;
  }
};
