import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "ramda";
import styled from "styled-components";
import Login from "../components/Auth/Login";
import Layout from "../components/Layout/Layout";
import Router from "./Router";
import { fetchProfile, FETCH_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";
import { Spin } from "antd";

const Content = styled.div`
  justify-content: center;
  background: white;
  padding: 30px;
  border-radius: 4px;
  margin: 0 auto;
  width: 100%;
`;

const ContentSpinner = styled.div`
  height: 100vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = ({ token, userId, fetchProfile, fetching }) => {
  useEffect(() => {
    if (token && !userId) {
      fetchProfile();
    }
  }, [fetchProfile, token, userId]);

  if (fetching) {
    return (
      <ContentSpinner>
        <Spin />
      </ContentSpinner>
    );
  }

  return (
    <Layout>
      <Content>{token ? <Router /> : <Login />}</Content>
    </Layout>
  );
};

const enhancer = compose(
  connect(
    state => ({
      token: state.user.token,
      userId: state.user._id,
      fetching: isLoading(FETCH_USER, state)
    }),
    { fetchProfile }
  )
);

export default enhancer(App);
