import React from "react";
import styled from "styled-components";
import categories from "../assets/categories.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
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
      <img style={{ width: "100%" }} src={categories} alt="Categorias" />
    </Wrapper>
  );
};

export default Categories;
