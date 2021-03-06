import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import InvoicesList from "./InvoicesList";
import Profile from "../components/Profile/Profile";
import Categories from "../components/Categories";
import Graphs from "./Graphs";

const Router = () => (
  <Switch>
    <Route path="/invoices" component={InvoicesList} />
    <Route path="/profile" component={Profile} />
    <Route path="/categories" component={Categories} />
    <Route path="/graphs" component={Graphs} />
    <Redirect to="/invoices" />
  </Switch>
);

export default Router;
