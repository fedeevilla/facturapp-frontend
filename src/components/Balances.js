import { Button, Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUsdBalance, UPDATE_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";

import InputBalance from "./InputBalance";

const Balances = () => {
  const dispatch = useDispatch();

  const usdBalance = useSelector(({ user }) => user.usdBalance);
  const usdBankUS = useSelector(({ user }) => user.usdBankUS);
  const usdBankAR = useSelector(({ user }) => user.usdBankAR);
  const loading = useSelector((state) => isLoading(UPDATE_USER, state));

  const [balance, setBalance] = useState(usdBalance);
  const [bankUS, setBankUS] = useState(usdBankUS);
  const [bankAR, setBankAR] = useState(usdBankAR);

  return (
    <Box borderWidth="1px" padding="5" shadow="md">
      <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 2, md: 12 }}>
        <InputBalance loading={loading} setValue={setBalance} title="USD Home" value={balance} />
        <InputBalance loading={loading} setValue={setBankUS} title="USD Bank US" value={bankUS} />
        <InputBalance loading={loading} setValue={setBankAR} title="USD Bank AR" value={bankAR} />
      </Stack>
      <Stack justifyContent="center" marginTop="4">
        <Button
          colorScheme="blue"
          isDisabled={loading}
          isLoading={loading}
          margin="auto"
          maxWidth="44"
          onClick={() =>
            dispatch(
              updateUsdBalance({
                usdBalance: Number(balance),
                usdBankUS: Number(bankUS),
                usdBankAR: Number(bankAR),
              }),
            )
          }
        >
          Guardar
        </Button>
      </Stack>
    </Box>
  );
};

export default Balances;
