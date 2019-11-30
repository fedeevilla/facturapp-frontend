import React from "react";
import PaymentsList from "./PaymentsList";
import styled from "styled-components";

const Content = styled.div`
  justify-content: center;
  background: white;
  padding: 30px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 50px;
  width: 100%;
`;

const App = () => {
  return (
    <Content>
      <PaymentsList />
    </Content>
  );
};

export default App;
