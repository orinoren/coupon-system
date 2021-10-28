import React from "react";
import "./MainPage.css";
import MainSearchForm from "../../componets/SearchFormComponents/MainSearchForm";
import MainPageContent from "../../componets/MainPageContentComponent/MainPageContent";
import { useDispatch, useSelector } from "react-redux";
import { guestOrCustomerModeAction } from "../../actions/actions-for-ui/action-for-ui";
import { useEffect } from "react";
import Cart from "../CartPage/Cart";

const Main = () => {
  const cartCouponsContent = useSelector(
    (state) => state.uiRootReducer.cartArrReducer
  );
  const showCart = useSelector(
    (state) => state.uiRootReducer.showCartModeReducer.showCartMode
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(guestOrCustomerModeAction());
    return () => {};
  }, [dispatch, cartCouponsContent]);
  return (
    <div>
      <div className="container-fluid main-container-bg  ">
        <div className="row ">
          <MainSearchForm placeholder={"Search coupon..."}></MainSearchForm>
        </div>

        <div>
          {showCart ? <Cart cartCouponList={cartCouponsContent}></Cart> : ""}
        </div>
        <div>
          <MainPageContent></MainPageContent>
        </div>
      </div>
    </div>
  );
};

export default Main;
