import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

import categories from "../assets/categories.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  a {
    margin: auto;
    margin-bottom: 20px;
  }
`;

const Categories = () => {
  return (
    <Wrapper>
      <Link to="/invoices">
        <Button type="primary">Volver</Button>
      </Link>
      <img alt="Categorias" src={categories} style={{ width: "100%" }} />
    </Wrapper>
  );
};

export default Categories;
