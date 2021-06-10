import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Grid, Stack, Badge } from "@chakra-ui/react";

import {
  lastInterannualAmount,
  thisMonthAmount,
  lastMonthAmount,
  lastYearPartialAmount,
  lastYearAmount,
} from "./selector";

const Tag = ({ children }) => {
  return (
    <Badge alignItems="center" colorScheme="green" display="flex">
      {children}
    </Badge>
  );
};
const Item = ({ children }) => {
  return (
    <Stack
      isInline
      borderLeftColor="blue.400"
      borderLeftWidth="5px"
      padding="3"
      shadow="md"
      borderLeftRadius={4}
    >
      {children}
    </Stack>
  );
};

const ReportInvoices = ({ invoices }) => {
  const { usdBalance, usdBankUS, usdBankAR, isPremiun, limit } = useSelector(
    ({ user }) => user
  );

  return (
    <Grid gap={5} templateColumns="repeat(1, 1fr)">
      <Item>
        <b>
          {`Facturación interanual (${moment()
            .subtract(11, "months")
            .format("MMM YYYY")}
            - ${moment().format("MMM YYYY")}): `}
        </b>
        <Tag>${lastInterannualAmount(invoices)}</Tag>
      </Item>
      <Item>
        <b>{`Límite para facturar: `}</b>
        <Tag>${(limit - lastInterannualAmount(invoices)).toFixed(2)}</Tag>
      </Item>
      <Item>
        <b>{`Facturación del mes actual (${moment().format("MMM YYYY")}): `}</b>
        <Tag>${thisMonthAmount(invoices)}</Tag>
      </Item>
      <Item>
        <b>
          {`Facturación del mes pasado (${moment()
            .subtract(1, "months")
            .format("MMM YYYY")}): `}
        </b>
        <Tag>${lastMonthAmount(invoices)}</Tag>
      </Item>
      <Item>
        <b>{`Facturación parcial anual (${moment().format("YYYY")}): `}</b>
        <Tag>${lastYearPartialAmount(invoices)}</Tag>
      </Item>
      <Item>
        <b>{`Facturación del año pasado (${moment()
          .subtract(1, "years")
          .format("YYYY")}): `}</b>
        <Tag>${lastYearAmount(invoices)}</Tag>
      </Item>
      {isPremiun && (
        <Item>
          <b>Balance USD: </b>
          <Tag>${usdBalance + usdBankUS + usdBankAR}</Tag>
        </Item>
      )}

      {/* <Links>
        <Link style={{ margin: "0 auto" }} to="/categories">
          Ver Categorías
        </Link>
        <Link style={{ margin: "0 auto" }} to="/graphs">
          Ver Gráficos
        </Link>
      </Links> */}
    </Grid>
  );
};

export default ReportInvoices;
