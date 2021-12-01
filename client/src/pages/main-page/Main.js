import React from "react";
import "./MainPage.css";
import MainSearchForm from "../../componets/search-form-components/MainSearchForm";
import MainPageContent from "../../componets/main-page-content-component/MainPageContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cart from "../cart-page/Cart";

const Main = () => {
  const cartCouponsContent = useSelector(
    (state) => state.uiRootReducer.cartArrReducer
  );
  const showCart = useSelector(
    (state) => state.uiRootReducer.showCartModeReducer.showCartMode
  );
  const userDetails = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails.role !== "CUSTOMER" || userDetails.isLogged === false) {
      if (localStorage.getItem("Role") !== "CUSTOMER") {
        dispatch({
          type: "LOGIN-SUCCEED",
          payload: {
            token: "",
            role: "GUEST",
            isLogged: false,
          },
        });
      }
    }
    dispatch({ type: "PURCHASE-COUPON-RESET-MSG" });
    return () => {};
  }, [dispatch, cartCouponsContent]);

  return (
    <div>
      <div className="container-fluid main-container-bg m-0 mt-md-2 p-0 p-md-3  ">
        <div className="row m-0 p-0 m-md-1 p-md-1 ">
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
