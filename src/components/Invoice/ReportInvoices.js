import React from "react";
import styled from "styled-components";
import { lastYeartAmount, thisMonthAmount, lastMonthAmount } from "./selector";

const Container = styled.div`
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
      <h3>
        <b>Facturación interanual:</b> ${lastYeartAmount(invoices)}
      </h3>
      <h3>
        <b>Facturación del mes:</b> ${thisMonthAmount(invoices)}
      </h3>
      <h3>
        <b>Facturación del mes pasado:</b> ${lastMonthAmount(invoices)}
      </h3>
    </Container>
  );
};

export default ReportInvoices;
