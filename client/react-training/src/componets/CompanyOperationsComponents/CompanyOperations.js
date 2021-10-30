import React from "react";
import "./CompanyOperations.css";
import CompanyOperationsCouponView from "./CompanyOperationsCouponView";
import CompanyOperationsForm from "./CompanyOperationsForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/defaultImage.jpg";
import { companyResetSubmitCoupon } from "../../actions/actions-for-ui/action-for-ui";

const CompanyOperations = (props) => {
  const companyCouponUpdateMode = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.updateMode
  );

  const companyCouponToUpdateObj = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.couponObj
  );

  const companyCouponAddMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );

  const [couponObj, setCouponObj] = useState({
    title: "Title",
    category_id: 0,
    description: "description",
    startDate: "2021-10-15",
    endDate: "2022-10-20",
    amount: "1",
    price: "1",
    couponImage: defaultImage,
  });
  useEffect(() => {
    if (companyCouponUpdateMode) {
      setCouponObj({
        ...companyCouponToUpdateObj,
        startDate: companyCouponToUpdateObj.startDate,
        endDate: companyCouponToUpdateObj.endDate,
      });
      setImageView("data:image/*;base64," + companyCouponToUpdateObj.image);
      setCategoryName(companyCouponToUpdateObj.category_id);
    }
    if (companyCouponAddMode) {
      setCouponObj({
        title: "Title",
        category_id: 0,
        description: "description",
        startDate: "2021-11-15",
        endDate: "2021-11-20",
        amount: "1",
        price: "1",
        couponImage: defaultImage,
      });
      setImageView(defaultImage);
    }
    return () => {};
  }, [companyCouponToUpdateObj, companyCouponAddMode]);

  const submitMsgView = useSelector(
    (state) =>
      state.uiRootReducer.companySubmitCouponReducer.companySubmitCoupon
  );
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("Category");

  const [imageView, setImageView] = useState(defaultImage);
  //--------------------------------------------------------------------------
  const handleOnCouponChange = (e, property) => {
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
  //-----------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="container mt-5 p-5 company-operations-bg">
        <div className="row align-items-center justify-content-evenly">
          <div className="col-6 ">
            <CompanyOperationsForm
              couponViewFunc={handleOnCouponChange}
              couponToUpdateObj={couponObj}
              categoryName={categoryName}
            ></CompanyOperationsForm>
          </div>
          <div className="col-4 ">
            <CompanyOperationsCouponView
              addMode={companyCouponAddMode}
              imgView={imageView}
              categoryName={categoryName}
              couponObject={couponObj}
            ></CompanyOperationsCouponView>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOperations;
