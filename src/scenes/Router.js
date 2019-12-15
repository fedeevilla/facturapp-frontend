import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PaymentsList from "./PaymentsList";
import Profile from "../components/Profile/Profile";

const Router = () => (
  <Switch>
    <Route path="/payments" component={PaymentsList} />
    <Route path="/profile" component={Profile} />
    <Redirect to="/payments" />
  </Switch>
);

export default Router;
