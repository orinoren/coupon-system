import React from "react";
import "./CompanyOperations.css";
import CompanyOperationsCouponView from "./CompanyOperationsCouponView";
import CompanyOperationsForm from "./CompanyOperationsForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/defaultImage.jpg";
import { handleOnCouponChangeFunc } from "./utils/CompanyOperationsFunctions";

const CompanyOperations = () => {
  const [couponObj, setCouponObj] = useState({});

  const [categoryName, setCategoryName] = useState("Category");

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
      });
      setImageView("data:image/*;base64," + companyCouponToUpdateObj.image);
      setCategoryName(companyCouponToUpdateObj.category_id);
      return;
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

  //--------------------------------------------------------------------------
  const handleOnCouponChange = (e, property) => {
    handleOnCouponChangeFunc(
      e,
      property,
      couponObj,
      setCouponObj,
      setCategoryName,
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
              couponToUpdateObj={couponObj}
              categoryName={categoryName}
            ></CompanyOperationsForm>
          </div>
          <div className="col-12 col-lg-4 mt-5 mt-lg-0 ">
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
