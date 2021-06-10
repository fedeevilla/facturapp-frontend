import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Stack } from "@chakra-ui/react";

import { updateUser, UPDATE_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";

import InputBalance from "./InputBalance";

const Limits = () => {
  const dispatch = useDispatch();
  const limitUset = useSelector(({ user }) => user.limit);
  const [limit, setLimit] = useState(limitUset);
  const loading = useSelector((state) => isLoading(UPDATE_USER, state));

  return (
    <Box borderWidth="1px" padding="5" shadow="md">
      <Stack>
        <InputBalance
          loading={loading}
          setValue={setLimit}
          title="Límite categoría Monotributo"
          value={limit}
        />
      </Stack>
      <Stack justifyContent="center" marginTop="4">
        <Button
          colorScheme="blue"
          isDisabled={loading}
          isLoading={loading}
          margin="auto"
          maxWidth="44"
          onClick={() => dispatch(updateUser({ limit }))}
        >
          Guardar
        </Button>
      </Stack>
    </Box>
  );
};

export default Limits;
