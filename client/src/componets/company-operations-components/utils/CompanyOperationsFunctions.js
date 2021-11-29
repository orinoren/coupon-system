import { companyResetSubmitCoupon } from "../../../actions/actions-for-ui/action-for-ui";
export const handleOnCouponChangeFunc = (
  e,
  property,
  couponObj,
  setCouponObj,
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
      setCouponObj({ ...couponObj, category: e.target.value });
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
        const imageSrc = URL.createObjectURL(e.target.files[0]);
        setImageView(imageSrc);
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
        startDate: "2022-01-15",
        endDate: "2022-02-15",
        amount: "1",
        price: "1",
        image: defaultImage,
      });
      setImageView(defaultImage);
      const allErrorInputsMsg = document.querySelectorAll(
        ".coupon-input-error"
      );
      allErrorInputsMsg.forEach((msg) => (msg.textContent = ""));
      if (submitMsgView) {
        dispatch(companyResetSubmitCoupon());
      }
      break;

    default:
      break;
  }
};
export const couponValidation = (
  { title, category, startDate, endDate, amount, price },
  titleErrorRef,
  categoryErrorRef,
  startDateErrorRef,
  endDateErrorRef,
  amountErrorRef,
  priceErrorRef
) => {
  let isValid = true;
  if (title === "") {
    titleErrorRef.current.textContent = "please enter title";
    isValid = false;
  }

  if (category === 0 || category === "Choose...") {
    categoryErrorRef.current.textContent = "please enter category";
    isValid = false;
  }
  if (startDate === "") {
    startDateErrorRef.current.textContent = "please enter date";
    isValid = false;
  }
  if (endDate === "") {
    endDateErrorRef.current.textContent = "please enter date";
    isValid = false;
  }
  if (amount <= 0) {
    amountErrorRef.current.textContent = "please enter amount bigger then 0";
    isValid = false;
  }
  if (price <= 0) {
    priceErrorRef.current.textContent = "please price bigger then 0";
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
