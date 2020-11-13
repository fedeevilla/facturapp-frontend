import React from "react";
import { InputNumber } from "antd";
import styled from "styled-components/macro";

const Container = styled.div`
  margin: auto;

  @media (max-width: 640px) {
    margin-bottom: 16px;
  }
`;

const InputBalance = ({ title, value, setValue }) => {
  return (
    <Container>
      <h4>{title}:</h4>
      <InputNumber
        value={value}
        style={{ width: 120, marginLeft: 10, marginRight: 10 }}
        step={100}
        onChange={setValue}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      />
    </Container>
  );
};

export default InputBalance;
