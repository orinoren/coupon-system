import React from "react";
import "./CompanyOperations.css";
import CompanyOperationsCouponView from "./CompanyOperationsCouponView";
import CompanyOperationsForm from "./CompanyOperationsForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/defaultImage.jpg";
import { handleOnCouponChangeFunc } from "./utils/CompanyOperationsFunctions";

const CompanyOperations = () => {
  const [couponObj, setCouponObj] = useState({
    title: "Title",
    category: "Choose...",
    description: "description",
    startDate: "2021-11-15",
    endDate: "2021-11-20",
    amount: "1",
    price: "1",
    image: defaultImage,
  });

  const [imageView, setImageView] = useState(defaultImage);

  const dispatch = useDispatch();

  const companyCouponUpdateMode = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.updateMode
  );

  const companyCouponAddMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );
  const companyCouponToUpdateObj = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.couponObj
  );

  const submitMsgView = useSelector(
    (state) =>
      state.uiRootReducer.companySubmitCouponReducer.companySubmitCoupon
  );

  useEffect(() => {
    if (companyCouponUpdateMode) {
      setCouponObj({
        ...companyCouponToUpdateObj,
        startDate: companyCouponToUpdateObj.startDate,
        endDate: companyCouponToUpdateObj.endDate,
        category: companyCouponToUpdateObj.category,
        image: "data:image/*;base64," + companyCouponToUpdateObj.image,
      });
      setImageView("data:image/*;base64," + companyCouponToUpdateObj.image);
      document
        .getElementById(`coupon-category-${companyCouponToUpdateObj.category}`)
        .setAttribute("selected", "");
      return;
    }

    setImageView(defaultImage);

    return () => {};
  }, [companyCouponToUpdateObj, companyCouponAddMode]);

  //--------------------------------------------------------------------------
  const handleOnCouponChange = (e, property) => {
    handleOnCouponChangeFunc(
      e,
      property,
      couponObj,
      setCouponObj,
      setImageView,
      defaultImage,
      submitMsgView,
      dispatch
    );
  };
  //-----------------------------------------------------------------------------------------------------

  return (
    <div>
      <div className="container mt-1 mt-lg-5 p-1 p-md-5 company-operations-bg">
        <div className="row m-0 p-0 m-md-1 p-md-1 align-items-center justify-content-evenly">
          <div className="col-12  col-lg-6 m-0 p-0 m-lg-1 p-lg-1 ">
            <CompanyOperationsForm
              couponViewFunc={handleOnCouponChange}
              couponObject={couponObj}
            ></CompanyOperationsForm>
          </div>
          <div className="col-12 col-lg-4 mt-5 mt-lg-0 ">
            <CompanyOperationsCouponView
              addMode={companyCouponAddMode}
              imgView={imageView}
              couponObject={couponObj}
            ></CompanyOperationsCouponView>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOperations;
