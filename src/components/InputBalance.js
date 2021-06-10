import React from "react";
import {
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const format = (val) => `$` + val;

const InputBalance = ({ title, value, setValue }) => {
  return (
    <Stack justifyContent="center" width="100%">
      <Text textAlign="center">{title}:</Text>
      <NumberInput precision={2} step={100} value={format(value)} onChange={setValue}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
};

export default InputBalance;
