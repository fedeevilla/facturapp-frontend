import React from "react";
import styled from "styled-components";
import {
  lastYeartAmount,
  thisMonthAmount,
  lastMonthAmount,
  lastYearAmount
} from "./selector";
import { Link } from "react-router-dom";
import moment from "moment";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin: auto;
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 25px;

  h3 {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Amount = styled.span`
  color: red;
  font-weight: bold;
`;

const ReportInvoices = ({ invoices }) => {
  return (
    <Container>
      <span>
        <h3>
          <b>
            {`Facturación interanual (${moment()
              .subtract(11, "months")
              .format("MMM YYYY")}
            - ${moment().format("MMM YYYY")}): `}
          </b>
          <Amount>${lastYeartAmount(invoices)}</Amount>
        </h3>
        <h3>
          <b>{`Facturación del mes actual (${moment().format(
            "MMM YYYY"
          )}): `}</b>
          <Amount>${thisMonthAmount(invoices)}</Amount>
        </h3>
        <h3>
          <b>
            {`Facturación del mes pasado (${moment()
              .subtract(1, "months")
              .format("MMM YYYY")}): `}
          </b>
          <Amount>${lastMonthAmount(invoices)}</Amount>
        </h3>
        <h3>
          <b>{`Facturación parcial anual (${moment().format("YYYY")}): `}</b>
          <Amount>${lastYearAmount(invoices)}</Amount>
        </h3>
      </span>
      <span style={{ margin: "auto 0" }}>
        <Link to="/categories">Ver Categorías</Link>
      </span>
    </Container>
  );
};

export default ReportInvoices;
