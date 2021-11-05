import MainSearchForm from "../../../componets/search-form-components/MainSearchForm";
import OperationButton from "../../../componets/operations-button-components/OperationsButton";
import {
  resetOpAction,
  showCompanyOpAction,
  showCustomerOpAction,
  resetSearchModeAction,
  adminCompanyAddMode,
  adminCustomerAddMode,
  adminResetAddMode,
} from "../../../actions/actions-for-ui/action-for-ui";

export const getMainSearchFormForCustomer = () => {
  return <MainSearchForm placeholder={"Search customer..."}></MainSearchForm>;
};
export const getMainSearchFormForCompany = () => {
  return <MainSearchForm placeholder={"Search company..."}></MainSearchForm>;
};
export const getCloseOperationButtonFunc = (dispatch) => {
  return (
    <div className="col-12 col-md-2 order-1 order-md-2  justify-content-center align-self-center m-0 mb-md-0">
      <div
        onClick={() => {
          resetAddMode(dispatch);
          dispatch(resetOpAction());
        }}
      >
        <OperationButton name="Close Operations"></OperationButton>
      </div>
    </div>
  );
};
export const getOperationsButtonForCompanyFunc = (
  isCompanyOperationMode,
  dispatch
) => {
  if (isCompanyOperationMode) {
    return (
      <div className="col-12  col-md-2 order-2 order-md-1 align-self-center mb-0 ">
        <div
          onClick={() => {
            handleOnAddCompanyClicked(dispatch);
            dispatch(showCompanyOpAction());
          }}
        >
          <OperationButton name="Add Company"></OperationButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-12  col-md-2 order-2 order-md-1 align-self-center mb-0 ">
        <div
          onClick={() => {
            resetAddMode(dispatch);
            dispatch(showCompanyOpAction());
          }}
        >
          <OperationButton name="Company Operations"></OperationButton>
        </div>
      </div>
    );
  }
};
export const getOperationsButtonForCustomerFunc = (
  isCustomerMode,
  dispatch
) => {
  if (isCustomerMode) {
    return (
      <div className="col-12 col-md-2 order-3 align-self-center">
        <div
          onClick={() => {
            handleOnAddCustomerClicked(dispatch);
            dispatch(showCustomerOpAction());
          }}
        >
          <OperationButton name="Add Customer"></OperationButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-12 col-md-2 order-3 align-self-center">
        <div
          onClick={() => {
            resetAddMode(dispatch);
            dispatch(showCustomerOpAction());
          }}
        >
          <OperationButton name="Customer Operations"></OperationButton>
        </div>
      </div>
    );
  }
};
const handleOnAddCompanyClicked = (dispatch) => {
  dispatch(resetSearchModeAction());
  dispatch(adminCompanyAddMode());
};
const handleOnAddCustomerClicked = (dispatch) => {
  dispatch(resetSearchModeAction());
  dispatch(adminCustomerAddMode());
};
const resetAddMode = (dispatch) => {
  dispatch(resetSearchModeAction());
  dispatch(adminResetAddMode());
};
