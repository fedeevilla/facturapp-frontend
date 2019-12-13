import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "ramda";
import styled from "styled-components";
import Login from "./Login";
import Router from "./Router";
import { fetchProfile } from "../store/actions/user";

const Content = styled.div`
  justify-content: center;
  background: white;
  padding: 30px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 50px;
  width: 100%;
`;

const App = ({ token, userId, fetchProfile }) => {
  useEffect(() => {
    if (token && !userId) {
      fetchProfile();
    }
  }, [fetchProfile, token, userId]);

  return <Content>{token ? <Router /> : <Login />}</Content>;
};

const enhancer = compose(
  connect(
    state => ({
      token: state.user.token,
      userId: state.user._id
    }),
    { fetchProfile }
  )
);

export default enhancer(App);
