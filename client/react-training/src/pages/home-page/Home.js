import React from "react";
import homePic from "../../images/tag.png";
import fotterPic from "../../images/grass.png";
import "./Header.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetUserModeAction } from "../../actions/actions-for-ui/action-for-ui";
import { getAllCouponsAction } from "../../actions/actions-for-guest/getAllCouponsAction";

const Home = () => {
  const history = useHistory();
  const userDetails = useSelector((state) => state.authReducer);
  const handleEnterAsGuestBtnClicked = () => {
    history.push("/main");
  };
  const handleLoginUserBtnClicked = () => {
    history.push("/login");
  };
  const handleGoToWebstieBtnClicked = () => {
    if (userDetails.role === "ADMIN") {
      history.push("/admin");
    } else if (userDetails.role === "COMPANY") {
      history.push("/company");
    } else if (userDetails.role === "CUSTOMER") {
      history.push("/main");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCouponsAction());
    return () => {};
  }, [dispatch]);
  return (
    <div className="container-fluid container-bg">
      <div className="row pt-5">
        <div className="h1 text-center text-lg-left  text-md-left col-12 col-md-5 col-lg-5 ml-1 text-success d-inline-block">
          MY COUPON PROJECT
        </div>
        <div className="col-md-4 col-lg-7 mt-3 justify-self-center ">
          <div className="row justify-content-center">
            {userDetails.isLogged ? (
              <button
                onClick={() => handleGoToWebstieBtnClicked()}
                className="btn home-login-btn 
              col-12 col-lg-2 offset-lg-3
          "
                type="button"
              >
                Go to website
              </button>
            ) : (
              <div>
                <button
                  onClick={() => handleEnterAsGuestBtnClicked()}
                  className="btn home-login-btn col-12 
          col-lg-2 offset-lg-6
          "
                  type="button"
                >
                  Enter As Guest
                </button>
                <button
                  onClick={() => handleLoginUserBtnClicked()}
                  className="btn home-login-btn col-12 
          col-lg-2 offset-lg-1
          "
                  type="button"
                >
                  Login User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row align-items-end">
        <div className="col-md-5 col-11  ">
          <h2 className="mb-5 text-end">
            My final project by
            <span className="text-warning"> orin oren </span>
          </h2>
          <p className="h5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            assumenda incidunt fugit harum? Aliquam itaque voluptas laudantium
            iusto fugit numquam ab enim dolorem, vel, eveniet excepturi! Est
            voluptatem odio, eius aliquid quisquam neque. Eveniet dolorem
            voluptatem cum, quae reprehenderit exercitationem consequuntur alias
            iusto, voluptates molestiae perferendis harum.
          </p>
          <p className="h5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            assumenda incidunt fugit harum? Aliquam itaque voluptas laudantium
            iusto fugit numquam ab enim dolorem, vel, eveniet excepturi! Est
            voluptatem odio, eius aliquid quisquam neque. Eveniet dolorem
            voluptatem cum, quae reprehenderit exercitationem consequuntur alias
            iusto, voluptates molestiae perferendis harum fffvsd vssvdsv
            vsvsdvsdvv sdvsvsd vsdvsdvs.
          </p>
        </div>
        <div className="col-7 d-md-flex d-none justify-content-center  ">
          <img className="rotate w-50 mt-5" src={homePic} alt="" />
        </div>
      </div>
      <div className=" d-inline d-md-none text-center">
        <div className="h1 pt-5">
          ORIN OREN <br /> RESPONSIVE WEBSITE
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img className="w-100" src={fotterPic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;