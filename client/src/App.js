import React from "react";
import Home from "./pages/home-page/Home";
import Main from "./pages/main-page/Main";
import NavBar from "./componets/navbar-components/NavBar";

import AdminMain from "./pages/admin-main-page/AdminMain";
import CompanyMain from "./pages/company-main-page/CompanyMain";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
import UnauthorizedPage from "./pages/unauthorized-page/UnauthorizedPage";
const App = () => {
  return (
    <>
      <Router>
        <Route path="/(home|admin|company|main|login|)">
          <NavBar></NavBar>
        </Route>
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
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/unauthorized">
            <UnauthorizedPage />
          </Route>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
