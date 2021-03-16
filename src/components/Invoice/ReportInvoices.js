import React from "react";
import styled from "styled-components/macro";
import {
  lastInterannualAmount,
  thisMonthAmount,
  lastMonthAmount,
  lastYearPartialAmount,
  lastYearAmount,
  lastInterannualAmountNext,
} from "./selector";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
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

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  @media (max-width: 640px) {
    margin-top: 10px;
  }
`;

const Amount = styled.span`
  color: red;
  font-weight: bold;
`;

const ReportInvoices = ({ invoices }) => {
  const { usdBalance, usdBankUS, usdBankAR, isPremiun, limit } = useSelector(
    ({ user }) => user
  );

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
          <Amount>${lastInterannualAmount(invoices)}</Amount>
        </h3>
        <h3>
          <b>{`Límite para facturar: `}</b>
          <Amount>
            ${(limit - lastInterannualAmount(invoices)).toFixed(2)}
          </Amount>
        </h3>
        <h3>
          <b>
            {`Siguiente Facturación interanual (${moment()
              .subtract(10, "months")
              .format("MMM YYYY")}
            - ${moment().add(1, "months").format("MMM YYYY")}): `}
          </b>
          <Amount>${lastInterannualAmountNext(invoices)}</Amount>
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
        <h3>
          <b>{`Facturación del año pasado (${moment()
            .subtract(1, "years")
            .format("YYYY")}): `}</b>
          <Amount>${lastYearAmount(invoices)}</Amount>
        </h3>
        {isPremiun && (
          <h3>
            <b>Balance USD: </b>
            <Amount>$ {usdBalance + usdBankUS + usdBankAR}</Amount>
          </h3>
        )}
      </span>
      <Links>
        <Link style={{ margin: "0 auto" }} to="/categories">
          Ver Categorías
        </Link>
        <Link style={{ margin: "0 auto" }} to="/graphs">
          Ver Gráficos
        </Link>
      </Links>
    </Container>
  );
};

export default ReportInvoices;
