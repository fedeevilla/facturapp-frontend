import React from "react";
import styled from "styled-components";
import * as R from "ramda";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { isLoading } from "../../utils/actions";
import { activateUser, ACTIVATE_USER } from "../../store/actions/user";

const Container = styled.div`
  display: grid;
  justify-content: center;
  padding: 30px;
  margin: 0 auto;
  margin-top: 50px;
  width: 400px;
  background: whitesmoke;
  border-radius: 15px;
`;

const ValidateUser = ({ pathname }) => {
  const loading = useSelector((state) => isLoading(ACTIVATE_USER, state));
  const dispatch = useDispatch();

  const token = R.split("/validate/", pathname)[1];

  return (
    <Container>
      <h1>Validación de cuenta</h1>
      <Button
        loading={loading}
        type="primary"
        onClick={async () => {
          await dispatch(activateUser(token));
          window.location.replace("/");
        }}
      >
        Activa tu cuenta
      </Button>
    </Container>
  );
};

export default ValidateUser;
