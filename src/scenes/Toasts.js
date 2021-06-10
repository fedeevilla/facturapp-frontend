import React from "react";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";

const Toasts = () => {
  const toast = useToast();
  const error = useSelector(({ user }) => user.error);

  if (error) {
    toast({
      title: error,
      status: "error",
      isClosable: true,
    });
  }

  return <div />;
};

export default Toasts;
