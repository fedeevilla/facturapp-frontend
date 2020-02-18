import React from "react";
import styled from "styled-components";
import {
  lastYearAmount,
  thisMonthAmount,
  lastMonthAmount,
  lastYearPartialAmount
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
          <Amount>${lastYearAmount(invoices)}</Amount>
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
          <Amount>${lastYearPartialAmount(invoices)}</Amount>
        </h3>
      </span>
      <div style={{ display: "grid", margin: "auto 0" }}>
        <Link style={{ margin: "0 auto" }} to="/categories">
          Ver Categorías
        </Link>
        <Link style={{ margin: "0 auto" }} to="/graphs">
          Ver Gráficos
        </Link>
      </div>
    </Container>
  );
};

export default ReportInvoices;
