import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Layout as AntdLayout, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import ContainerContext from "./ConteinerContext";
import { getOptimizedAvatar } from "../../utils/images";

const { Header } = AntdLayout;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  .ant-layout {
    min-height: 100%;
  }

  hr {
    border-top: 1px solid ${({ theme }) => theme["@primary"]};
  }

  .layout-header {
    padding: 0 16px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #343a40;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-left: 20px;
  color: white;
  white-space: nowrap;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-basis: 310px;
  justify-content: flex-end;

  a {
    color: white;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  line-height: 1em;
  margin-right: 16px;
  color: ${({ theme }) => theme["@light"]};
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:focus {
    text-decoration: none;
  }

  &.active {
    border-bottom: 2px solid currentColor;
    color: #1890ff;
  }

  &:last-of-type {
    margin-right: 0;
  }

  .ant-avatar {
    width: 28px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme["@light"]};
    margin-bottom: 4px;
  }
`;

const Layout = ({ children }) => {
  const user = useSelector(({ user }) => user);
  const containerRef = React.useRef(null);

  return (
    <Container>
      <Header className="layout-header">
        <NavLink to="/" style={{ flexBasis: "310px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Title>Facturación AFIP</Title>
          </div>
        </NavLink>
        {user.token && (
          <LinksContainer>
            <StyledLink to="/profile">
              <Avatar
                className="avatar"
                src={getOptimizedAvatar(user.avatar)}
                icon="user"
              />
              <span>Perfil</span>
            </StyledLink>
          </LinksContainer>
        )}
      </Header>
      <ContainerContext.Provider value={containerRef}>
        <Content ref={containerRef}>{children}</Content>
      </ContainerContext.Provider>
    </Container>
  );
};

export default Layout;
