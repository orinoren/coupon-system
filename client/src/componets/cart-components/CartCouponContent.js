import "../../pages/cart-page/Cart.css";

import defaultImage from "../../images/defaultImage.jpg";
const CartCouponContent = (props) => {
  return (
    <div className="container-fluid p-0 my-3 cart-content-bg ">
      <div className="row m-0">
        <div className="col-12 p-0 ">
          <div className="container-fluid  p-0">
            <div className="row m-0   ">
              <div className="align-self-center d-none d-md-block  p-0 col-3 ">
                <div className="container-fluid p-0">
                  <div className="row m-0 justify-content-center ">
                    <img
                      className="cart-content-coupon-image"
                      src={
                        props.image === undefined
                          ? defaultImage
                          : "data:image/*;base64," + props.image
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-9 p-0 cart-coupon-border ">
                <div className="container-fluid h-100 p-0 cart-coupon-content-details ">
                  <div className="row h-100 m-0 ">
                    <div className="container">
                      <div className="row">
                        <div className="col-6 text-start">
                          <div className="h4 p-1">{props.title}</div>
                        </div>
                        <div className="col-6 text-end fw-bold fs-6 text-danger">
                          expired date : {props.endDate.replaceAll("-", "/")}
                        </div>
                      </div>
                      <div
                        className="row h-75
                       "
                      >
                        <div className="col-10 text-start">
                          <div className="text-wrap">{props.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row h-100 align-items-end justify-content-between ">
                        <div className="col-3 fw-bold text-primary fs-6">
                          amount : {props.amount}
                        </div>
                        <div className="col-6  ">
                          <div className="p-1 text-end  text-success fw-bold fs-4">
                            <span className="none">
                              {props.couponInCartAmount + ` x `}
                            </span>
                            {props.price}$
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCouponContent;
