import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { amountPerMonth, months } from "../components/Invoice/selector";
import LineChart from "../components/Invoice/LineChart";

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

const Graphs = () => {
  const invoices = useSelector(({ invoices }) => invoices.list);

  return (
    <Wrapper>
      <Link style={{ margin: "auto" }} to="/invoices">
        <Button type="primary">Volver</Button>
      </Link>
      {invoices && (
        <div>
          <LineChart
            invoices={amountPerMonth(invoices)}
            labels={months()}
            title={`Facturación interanual (${moment().subtract(11, "months").format("MMM YYYY")}
            - ${moment().format("MMM YYYY")}): `}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Graphs;
