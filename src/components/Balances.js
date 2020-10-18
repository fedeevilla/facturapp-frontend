import { Button, InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { updateUsdBalance, UPDATE_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";

const Container = styled.div`
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background: whitesmoke;
  padding: 20px;
  border-radius: 6px;
`;

const Balances = () => {
  const usdBalance = useSelector(({ user }) => user.usdBalance);
  const loading = useSelector((state) => isLoading(UPDATE_USER, state));
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(usdBalance);

  return (
    <Container>
      <h3>USD:</h3>
      <InputNumber
        value={balance}
        style={{ width: 120, marginLeft: 10, marginRight: 10 }}
        step={100}
        onChange={setBalance}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      />
      <Button
        type="primary"
        onClick={() =>
          dispatch(updateUsdBalance({ usdBalance: Number(balance) }))
        }
        disabled={loading}
        loading={loading}
      >
        Guardar
      </Button>
    </Container>
  );
};

export default Balances;
