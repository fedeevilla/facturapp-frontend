import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { updateUsdBalance, UPDATE_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";
import InputBalance from "./InputBalance";

const Container = styled.div`
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background: whitesmoke;
  padding: 20px;
  border-radius: 15px;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
`;

const WrapperBalance = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

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
    <Container>
      <WrapperBalance>
        <InputBalance
          title="USD Home"
          value={balance}
          setValue={setBalance}
          loading={loading}
        />
        <InputBalance
          title="USD Bank US"
          value={bankUS}
          setValue={setBankUS}
          loading={loading}
        />
        <InputBalance
          title="USD Bank AR"
          value={bankAR}
          setValue={setBankAR}
          loading={loading}
        />
      </WrapperBalance>
      <Button
        style={{ margin: "auto", marginTop: 24 }}
        type="primary"
        loading={loading}
        disabled={loading}
        onClick={() =>
          dispatch(
            updateUsdBalance({
              usdBalance: Number(balance),
              usdBankUS: Number(bankUS),
              usdBankAR: Number(bankAR),
            })
          )
        }
      >
        Guardar
      </Button>
    </Container>
  );
};

export default Balances;
