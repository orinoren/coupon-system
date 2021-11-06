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
                onClick={() =>
                  handleEditBtnClicked(companyCouponAddMode, props, dispatch)
                }
                className="text-primary fs-3 fas fa-edit"
              ></i>
            </span>
          </div>
          <div className="coupon-card-op-icon">
            <span>
              <i
                onClick={() => handleDeleteBtnClicked(props, dispatch)}
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
  return (
    <div
      onClick={() =>
        hanldeAddToCartClicked(
          showAddToCartControlles,
          setShowAddToCartControlles
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

const handleEditBtnClicked = (companyCouponAddMode, props, dispatch) => {
  if (companyCouponAddMode) {
    dispatch(companyCouponResetAddModeAction());
    dispatch(companyCouponUpdateModeAction(props));
    return;
  }
  dispatch(companyCouponUpdateModeAction(props));
};
const handleDeleteBtnClicked = (props, dispatch) => {
  dispatch(companyDeleteCouponAction(props.coupon_id));
};
const hanldeAddToCartClicked = (
  showAddToCartControlles,
  setShowAddToCartControlles
) => {
  if (showAddToCartControlles) {
    setShowAddToCartControlles(false);
    return;
  }
  setShowAddToCartControlles(true);
};
