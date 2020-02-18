import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchiInvoices, FETCH_INVOICES } from "../store/actions/invoices";
import LineChart from "../components/Invoice/LineChart";
import { isLoading } from "../utils/actions";
import { Spin } from "antd";

const Graphs = ({ invoices, loading, fetchiInvoices }) => {
  useEffect(() => {
    !invoices && fetchiInvoices();
  }, [fetchiInvoices, invoices]);

  if (loading) return <Spin></Spin>;
  return invoices && <LineChart invoices={invoices} />;
};

const enhancer = connect(
  state => ({
    invoices: state.invoices.list,
    loading: isLoading(FETCH_INVOICES, state)
  }),
  {
    fetchiInvoices
  }
);

export default enhancer(Graphs);
