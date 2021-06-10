import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Box, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { login } from "../../store/actions/user";

import SignUp from "./SignUp";

const Login = () => {
  const [showSignUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(({ user }) => user.loading);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (values) => dispatch(login(values));

  return (
    <>
      <Box borderWidth="1px" margin="auto" maxWidth="md" p={5} rounded="4" shadow="md" width="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            backgroundColor="white"
            colorScheme="#FFF"
            focusBorderColor={errors.email && "red.500"}
            isInvalid={errors.email}
            marginTop="2"
            name="email"
            placeholder="Email"
            variant="outline"
          />

          <Input
            ref={register({
              required: true,
            })}
            backgroundColor="white"
            colorScheme="#FFF"
            focusBorderColor={errors.password && "red.500"}
            isInvalid={errors.password}
            marginTop="2"
            name="password"
            paddingRight="4.5rem"
            placeholder="Contraseña"
            type="password"
          />
          <Stack isInline alignItems="center" justifyContent="space-around" marginTop="5">
            <Button maxWidth="44" width="full" onClick={() => setSignUp(true)}>
              Registrarme
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={errors.password || errors.email}
              isLoading={loading}
              maxWidth="44"
              type="submit"
              width="full"
            >
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </Box>
      {showSignUp && <SignUp setSignUp={setSignUp} visible={showSignUp} />}
    </>
  );
};

export default Login;
