import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import * as R from "ramda";
import { Table, Button, Popconfirm } from "antd";
import { compose } from "recompose";
import { connect } from "react-redux";
import { isLoading } from "../utils/actions";
import {
  FETCH_PAYMENTS,
  fetchPayments,
  deletePayment,
  DELETE_PAYMENT
} from "../store/actions/payments";

import { logout, LOGOUT } from "../store/actions/user";
import NewPayment from "./NewPayment";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;
const WrapperButton = styled.div`
  display: grid;
  justify-content: center;
`;

const PaymentsList = ({
  payments,
  fetchPayments,
  loading,
  deletePayment,
  deleting,
  logout,
  loggingout
}) => {
  const [showModalPayment, setShowModalPayment] = useState(false);
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const sortedPayments = R.sort(R.descend(R.prop("date")), payments);

  const totalAmount = () => {
    let total = 0;
    const lastYear = R.take(2, sortedPayments);
    lastYear.forEach(({ amount, dollar }) => {
      total += dollar === 0 ? amount : amount * dollar;
    });
    return total.toFixed(2);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: date => moment(date).format("MMMM YYYY")
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
      render: (amount, { dollar }) => {
        return dollar === 0 ? `$ ${amount}` : `U$D ${amount}`;
      }
    },
    {
      title: "Cotización USD",
      dataIndex: "dollar",
      key: "dollar",
      render: dollar => `U$D ${dollar}`
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (_, { dollar, amount }) => {
        const total = dollar === 0 ? amount : amount * dollar;
        return <b>$ {total.toFixed(2)}</b>;
      }
    },
    {
      title: "Acción",
      dataIndex: "_id",
      key: "action",
      render: _id => (
        <Popconfirm
          title="¿Estás seguro?"
          onConfirm={() => deletePayment(_id)}
          okText="Si"
          cancelText="No"
        >
          <Button
            loading={deleting}
            shape="circle"
            icon="delete"
            type="danger"
          />
        </Popconfirm>
      )
    }
  ];

  return (
    <Wrapper>
      <h2>Facturación AFIP</h2>
      <Table
        style={{ width: 750 }}
        loading={loading}
        columns={columns}
        dataSource={sortedPayments}
        rowKey="_id"
        footer={() => {
          const total = totalAmount();
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>
                <span>
                  Facturación interanual: ${total} => ${(total / 12).toFixed(2)}
                  /mes
                </span>
              </b>
              <Button onClick={() => setShowModalPayment(true)} type="primary">
                Nueva
              </Button>
            </div>
          );
        }}
      />
      {showModalPayment && (
        <NewPayment
          visible={showModalPayment}
          setShowModalPayment={showModalPayment =>
            setShowModalPayment(showModalPayment)
          }
        />
      )}
      <WrapperButton>
        <Button type="danger" disabled={loggingout} onClick={() => logout()}>
          Cerrar Sesion
        </Button>
      </WrapperButton>
    </Wrapper>
  );
};

const enhancer = compose(
  connect(
    state => ({
      payments: state.payments.list,
      loading: isLoading(FETCH_PAYMENTS, state),
      deleting: isLoading(DELETE_PAYMENT, state),
      loggingout: isLoading(LOGOUT, state)
    }),
    {
      fetchPayments,
      deletePayment,
      logout
    }
  )
);

export default enhancer(PaymentsList);
