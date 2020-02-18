import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchiInvoices, FETCH_INVOICES } from "../store/actions/invoices";
import LineChart from "../components/Invoice/LineChart";
import { isLoading } from "../utils/actions";
import { Spin, Button } from "antd";
import moment from "moment";
import { amountPerMonth, months } from "../components/Invoice/selector";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

const Graphs = ({ invoices, loading, fetchiInvoices }) => {
  useEffect(() => {
    !invoices && fetchiInvoices();
  }, [fetchiInvoices, invoices]);

  if (loading) return <Spin></Spin>;
  return (
    <Wrapper>
      <Link to="/invoices" style={{ margin: "auto" }}>
        <Button type="primary">Volver</Button>
      </Link>
      {invoices && (
        <div>
          <LineChart
            title={`Facturación interanual (${moment()
              .subtract(11, "months")
              .format("MMM YYYY")}
            - ${moment().format("MMM YYYY")}): `}
            invoices={amountPerMonth(invoices)}
            labels={months()}
          />
        </div>
      )}
    </Wrapper>
  );
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
