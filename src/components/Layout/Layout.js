import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Stack>
      <Stack background="blue.500" height="15" justify="center" padding="10">
        <Text color="white" fontSize="xl">
          Facturapp
        </Text>
      </Stack>
      {children}
    </Stack>
  );
};

export default Layout;
