import React from "react";
import styled from "styled-components";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Button } from "antd";
import { logout, LOGOUT } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const Container = styled.div`
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin: 20px;
`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
`;

const SignOut = ({ logout, loggingout }) => {
  return (
    <Container>
      <WrapperButton>
        <Button type="danger" disabled={loggingout} onClick={() => logout()}>
          Cerrar Sesión
        </Button>
      </WrapperButton>
    </Container>
  );
};

const enhancer = compose(
  connect(
    state => ({
      loggingout: isLoading(LOGOUT, state)
    }),
    { logout }
  )
);

export default enhancer(SignOut);
