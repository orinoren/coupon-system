import { companyDeleteCouponAction } from "../../../../actions/actions-for-company/deleteCouponAction";
import {
  companyCouponResetAddModeAction,
  companyCouponUpdateModeAction,
} from "../../../../actions/actions-for-ui/action-for-ui";
import CouponControllers from "../../coupon-card-controllers/CouponControllers";
export const getCouponCardFotterFunc = (
  role,
  props,
  companyCouponAddMode,
  showAddToCartControlles,
  setShowAddToCartControlles,
  couponAddToCartAmount,
  setCouponAddToCartAmount,
  dispatch
) => {
  if (role === "COMPANY") {
    return (
      <div>
        <div className="d-flex mt-3 pt-2 border-top justify-content-between">
          <div className="coupon-card-op-icon">
            <span>
              <i
                onClick={(e) => {
                  handleEditBtnClicked(
                    companyCouponAddMode,
                    props,
                    dispatch,
                    e
                  );
                }}
                className="text-primary fs-3 fas fa-edit"
              ></i>
            </span>
          </div>
          <div className="coupon-card-op-icon">
            <span>
              <i
                onClick={(e) => handleDeleteBtnClicked(props, dispatch, e)}
                className="text-danger fs-3 fas fa-trash-alt"
              ></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (role === "ADMIN") {
    return (
      <div className="text-center border bg-primary text-white ">
        {props.companyName}
      </div>
    );
  }
  if (props.showCustomerCoupons) {
    return (
      <div className="text-center border bg-primary text-white ">
        see details
      </div>
    );
  }
  return (
    <div
      onClick={(e) =>
        hanldeAddToCartClicked(
          showAddToCartControlles,
          setShowAddToCartControlles,
          e
        )
      }
      className="btn-primary w-100 mt-2 text-center"
    >
      {showAddToCartControlles ? (
        <CouponControllers
          coupon={props}
          controlAmount={couponAddToCartAmount}
          setControlAmount={setCouponAddToCartAmount}
        ></CouponControllers>
      ) : (
        <div>add to cart</div>
      )}
    </div>
  );
};

const handleEditBtnClicked = (companyCouponAddMode, props, dispatch, e) => {
  e.stopPropagation();
  if (companyCouponAddMode) {
    dispatch(companyCouponResetAddModeAction());
  }
  dispatch(companyCouponUpdateModeAction(props));
};
const handleDeleteBtnClicked = (props, dispatch, e) => {
  e.stopPropagation();
  dispatch(companyDeleteCouponAction(props.id));
};
const hanldeAddToCartClicked = (
  showAddToCartControlles,
  setShowAddToCartControlles,
  e
) => {
  e.stopPropagation();
  if (showAddToCartControlles) {
    setShowAddToCartControlles(false);
    return;
  }
  setShowAddToCartControlles(true);
};
