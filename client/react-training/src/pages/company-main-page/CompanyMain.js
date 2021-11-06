import React from "react";
import "./CompanyMain.css";
import CompanyOperations from "../../componets/company-operations-components/CompanyOperations";
import MainSearchForm from "../../componets/search-form-components/MainSearchForm";
import OperationButton from "../../componets/operations-button-components/OperationsButton";
import MainPageContent from "../../componets/main-page-content-component/MainPageContent";
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
      return;
    }
    if (companyCouponAddMode) {
      dispatch(companyCouponResetAddModeAction());
    return;
    } 
    dispatch(companyCouponAddModeAction());
    
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
  const userDetails = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (userDetails.role !== "COMPANY" || userDetails.isLogged === false) {
      history.push("/home");
    } else {
      dispatch(companyModeAction());
    }
    return () => {};
  }, [dispatch, history, userDetails.isLogged, userDetails.role]);

  return (
    <div>
      <MainSearchForm placeholder={"Search coupon..."}></MainSearchForm>
      <div className="container-fluid mt-0 mt-md-5">
        <div className="row justify-content-center">
          <div className="p-0 p-md-1 col-12 col-md-2">
            <div className="" onClick={handleButtonClick}>
              <OperationButton
                name={companyCouponAddMode ? "Close Add Mode" : "Add Coupon"}
              ></OperationButton>
            </div>
          </div>
        </div>
      </div>

      {companyCouponAddMode || companyCouponUpdateMode ? (
        <CompanyOperations></CompanyOperations>
      ) : (
        ""
      )}
      <MainPageContent></MainPageContent>
    </div>
  );
};

export default CompanyMain;
