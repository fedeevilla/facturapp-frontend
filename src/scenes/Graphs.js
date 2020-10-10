import React from "react";
import { useSelector } from "react-redux";
import LineChart from "../components/Invoice/LineChart";
import { Button } from "antd";
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

const Graphs = () => {
  const invoices = useSelector(({ invoices }) => invoices.list);

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

export default Graphs;
