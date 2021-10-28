import React from "react";
import Home from "./pages/HomePage/Home";
import Main from "./pages/MainPage/Main";
import NavBar from "./componets/NavBarComponents/NavBar";
import Cart from "./pages/CartPage/Cart";
import AdminMain from "./pages/AdminMainPage/AdminMain";
import CompanyMain from "./pages/CompanyMainPage/CompanyMain";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/admin">
            <AdminMain></AdminMain>
          </Route>
          <Route path="/company">
            <CompanyMain></CompanyMain>
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
