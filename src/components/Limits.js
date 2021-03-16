import { Button, InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { updateUser, UPDATE_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Limits = () => {
  const dispatch = useDispatch();
  const limitUset = useSelector(({ user }) => user.limit);
  const [limit, setLimit] = useState(limitUset);
  const loading = useSelector((state) => isLoading(UPDATE_USER, state));

  return (
    <Container>
      <h4 style={{ textAlign: "center", width: "100%" }}>
        Límite categoría Monotributo:
      </h4>
      <Wrapper>
        <InputNumber
          value={limit}
          style={{ width: 120, marginLeft: 10, marginRight: 10 }}
          step={1000}
          onChange={setLimit}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Wrapper>
      <Button
        style={{ margin: "auto", marginTop: 24 }}
        type="primary"
        loading={loading}
        disabled={loading}
        onClick={() => dispatch(updateUser({ limit }))}
      >
        Guardar
      </Button>
    </Container>
  );
};

export default Limits;
