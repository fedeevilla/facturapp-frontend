import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PaymentsList from "./PaymentsList";

const Router = () => (
  <Switch>
    <Route path="/payments" component={PaymentsList} />
    <Redirect to="/payments" />
  </Switch>
);

export default Router;
