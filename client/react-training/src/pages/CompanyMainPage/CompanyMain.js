import React from "react";
import "./CompanyMain.css";
import CompanyOperations from "../../componets/CompanyOperationsComponents/CompanyOperations";
import MainSearchForm from "../../componets/SearchFormComponents/MainSearchForm";
import OperationButton from "../../componets/OperationsButtonComponents/OperationsButton";
import MainPageContent from "../../componets/MainPageContentComponent/MainPageContent";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import {
  companyModeAction,
  companyCouponAddModeAction,
  companyCouponResetAddModeAction,
  companyCouponResetUpdateModeAction,
} from "../../actions/actions-for-ui/action-for-ui";
import { getAllCompanyCouponsAction } from "../../actions/actions-for-company/getAllCompanyCouponsAction";
const CompanyMain = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    if (companyCouponUpdateMode) {
      dispatch(companyCouponResetUpdateModeAction());
    }
    if (companyCouponAddMode) {
      dispatch(companyCouponResetAddModeAction());
    } else {
      dispatch(companyCouponAddModeAction());
    }
  };
  const companyCouponUpdateMode = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.updateMode
  );
  const companyCouponAddMode = useSelector(
    (state) => state.uiRootReducer.companyAddCouponModeReducer.addMode
  );
  const companyCouponToUpdateObj = useSelector(
    (state) => state.uiRootReducer.companyUpdateCouponModeReducer.couponObj
  );
  const showSearch = useSelector(
    (state) => state.uiRootReducer.searchModeReducer.searchMode
  );

  const history = useHistory();
  const loginDetails = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (loginDetails.role !== "COMPANY" || loginDetails.logged === false) {
      history.push("/home");
    } else {
      dispatch(companyModeAction());
    }
    return () => {};
  }, [dispatch, history, loginDetails.logged, loginDetails.role]);

  return (
    <div>
      <MainSearchForm placeholder={"Search coupon..."}></MainSearchForm>
      <div className="container-fluid mt-0 mt-md-5">
        <div className="row justify-content-center">
          <div className="col-6 col-sm-2">
            <div className="w-75 h-75" onClick={handleButtonClick}>
              <OperationButton
                name={companyCouponAddMode ? "Close Add Mode" : "Add Coupon"}
              ></OperationButton>
            </div>
          </div>
        </div>
      </div>

      {companyCouponAddMode || companyCouponUpdateMode ? (
        companyCouponUpdateMode ? (
          <CompanyOperations
            couponAddMode={companyCouponAddMode}
            couponToUpdate={companyCouponToUpdateObj}
          />
        ) : (
          <CompanyOperations></CompanyOperations>
        )
      ) : (
        ""
      )}
      <MainPageContent></MainPageContent>
    </div>
  );
};

export default CompanyMain;
