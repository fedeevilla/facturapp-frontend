import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Login from "../components/Auth/Login";
import Layout from "../components/Layout/Layout";
import Router from "./Router";
import { fetchProfile, FETCH_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";
import { Spin } from "antd";
import { fetchInvoices, FETCH_INVOICES } from "../store/actions/invoices";

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

const App = () => {
  const token = useSelector(({ user }) => user.token);
  const userId = useSelector(({ user }) => user.userId);
  const invoices = useSelector(({ invoices }) => invoices.list);
  const isFetching = useSelector((state) => isLoading(FETCH_USER, state));
  const isFetchingInvoices = useSelector((state) =>
    isLoading(FETCH_INVOICES, state)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !userId) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (token && !invoices) {
      dispatch(fetchInvoices());
    }
  }, [dispatch, invoices, token]);

  if (isFetching || isFetchingInvoices) {
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

export default App;
