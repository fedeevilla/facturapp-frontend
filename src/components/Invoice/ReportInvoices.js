import React from "react";
import styled from "styled-components";
import { lastYeartAmount, thisMonthAmount, lastMonthAmount } from "./selector";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin: auto;
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 25px;
`;

const ReportInvoices = ({ invoices }) => {
  return (
    <Container>
      <span>
        <h3>
          <b>Facturación interanual:</b> ${lastYeartAmount(invoices)}
        </h3>
        <h3>
          <b>Facturación del mes:</b> ${thisMonthAmount(invoices)}
        </h3>
        <h3>
          <b>Facturación del mes pasado:</b> ${lastMonthAmount(invoices)}
        </h3>
      </span>
      <span style={{ margin: "auto 0" }}>
        <Link to="/categories">Ver Categorias</Link>
      </span>
    </Container>
  );
};

export default ReportInvoices;
