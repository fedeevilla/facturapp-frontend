import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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

const SignOut = () => {
  const loading = useSelector((state) => isLoading(LOGOUT, state));
  const dispatch = useDispatch();

  return (
    <Container>
      <WrapperButton>
        <Button
          type="danger"
          disabled={loading}
          onClick={() => dispatch(logout())}
        >
          Cerrar Sesión
        </Button>
      </WrapperButton>
    </Container>
  );
};

export default SignOut;
