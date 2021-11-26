import { companyResetSubmitCoupon } from "../../../actions/actions-for-ui/action-for-ui";
export const handleOnCouponChangeFunc = (
  e,
  property,
  couponObj,
  setCouponObj,
  setCategory,
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
      console.log(e.target.value);
      if (e.target.value !== 0 && e.target.value !== "Choose...") {
        const categoryName = document.getElementById(e.target.value);
        setCategory(categoryName.textContent);
        setCouponObj({ ...couponObj, category: e.target.value });
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
        category: "Choose...",
        description: "description",
        startDate: "2021-11-15",
        endDate: "2021-12-15",
        amount: "1",
        price: "1",
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
      setCategory("Category");
      if (submitMsgView) {
        dispatch(companyResetSubmitCoupon());
      }
      break;

    default:
      break;
  }
};
export const couponValidation = ({
  title,
  category,
  startDate,
  endDate,
  amount,
  price,
}) => {
  let isValid = true;
  if (title === "") {
    document.getElementById("coupon-title-input-error").textContent =
      "please enter title";
    isValid = false;
  }

  if (category === 0 || category === "Choose...") {
    document.getElementById("coupon-category-input-error").textContent =
      "please enter category";
    isValid = false;
  }
  if (startDate === "") {
    document.getElementById("coupon-start-date-input-error").textContent =
      "please enter date";
    isValid = false;
  }
  if (endDate === "") {
    document.getElementById("coupon-end-date-input-error").textContent =
      "please enter date";
    isValid = false;
  }
  if (amount <= 0) {
    document.getElementById("coupon-amount-input-error").textContent =
      "please enter amount bigger then 0";
    isValid = false;
  }
  if (price <= 0) {
    document.getElementById("coupon-price-input-error").textContent =
      "please price bigger then 0";
    isValid = false;
  }
  return isValid;
};
export const getCouponSubmitMsgFunc = (couponPurchaseDetails, addMode) => {
  if (couponPurchaseDetails.failed) {
    return (
      <span className="m-2 overflow-auto text-danger">
        {couponPurchaseDetails.messege}
      </span>
    );
  }
  if (addMode) {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <span className="text-success w-100  p-1 fs-5 fw-bold">
            Coupon added successfully
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-12 text-center">
        <span className="text-success w-100  p-1 fs-5 fw-bold">
          Coupon updated successfully
        </span>
      </div>
    </div>
  );
};
