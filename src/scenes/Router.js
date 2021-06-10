import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Profile from "../components/Profile/Profile";
import Categories from "../components/Categories";

import InvoicesList from "./InvoicesList";
import Graphs from "./Graphs";

const Router = () => (
  <Switch>
    <Route component={InvoicesList} path="/invoices" />
    <Route component={Profile} path="/profile" />
    <Route component={Categories} path="/categories" />
    <Route component={Graphs} path="/graphs" />
    <Redirect to="/invoices" />
  </Switch>
);

export default Router;
