import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Spinner } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import Layout from "../components/Layout/Layout";
import { fetchProfile, FETCH_USER } from "../store/actions/user";
import { isLoading } from "../utils/actions";
import { fetchInvoices, FETCH_INVOICES } from "../store/actions/invoices";
import Router from "./Router";
import Toasts from "./Toasts";

const Content = styled.div`
  justify-content: center;
  background: white;
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
        <Spinner
          margin="auto"
          color="blue.500"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      </ContentSpinner>
    );
  }

  return (
    <Layout>
      <Content>{token ? <Router /> : <Login />}</Content>
      <Toasts />
    </Layout>
  );
};

export default App;
