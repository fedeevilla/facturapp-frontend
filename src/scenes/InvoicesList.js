import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import * as R from "ramda";
import { Table, Button, Popconfirm, Tag, Alert, Tooltip } from "antd";
import { compose } from "recompose";
import { connect } from "react-redux";
import { isLoading } from "../utils/actions";
import {
  FETCH_INVOICES,
  fetchiInvoices,
  deleteInvoice,
  DELETE_INVOICE
} from "../store/actions/invoices";

import { logout, LOGOUT } from "../store/actions/user";
import NewInvoice from "./NewInvoice";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InvoicesList = ({
  invoices,
  fetchiInvoices,
  loading,
  deleteInvoice,
  deleting,
  logout,
  loggingout
}) => {
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchiInvoices();
  }, [fetchiInvoices]);

  const sortedinvoices = R.sort(R.descend(R.prop("date")), invoices);

  const totalAmount = () => {
    let total = 0;
    const lastYear = R.take(12, sortedinvoices);
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
      render: _id => {
        const invoice = R.find(R.propEq("_id", _id), invoices);

        return (
          <>
            <Tooltip title="Editar factura">
              <Button
                onClick={() => {
                  setInvoice(invoice);
                  setShowModalInvoice(true);
                }}
                shape="circle"
                icon="edit"
                type="primary"
                style={{ marginRight: 20 }}
              />
            </Tooltip>
            <Popconfirm
              title="¿Estás seguro?"
              onConfirm={() => deleteInvoice(_id)}
              okText="Eliminar"
              cancelText="Cancelar"
            >
              <Tooltip title="Eliminar factura">
                <Button
                  loading={deleting}
                  shape="circle"
                  icon="delete"
                  type="danger"
                  style={{ marginRight: 20 }}
                />
              </Tooltip>
            </Popconfirm>
            {invoice.pdf && (
              <a target="_blank" rel="noopener noreferrer" href={invoice.pdf}>
                <Tooltip title="Ver factura">
                  <Button shape="circle" icon="file" type="default" />
                </Tooltip>
              </a>
            )}
          </>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <Table
        style={{ width: "100%" }}
        loading={loading}
        columns={columns}
        dataSource={sortedinvoices}
        rowKey="_id"
        footer={() => {
          const total = totalAmount();
          return (
            <Footer>
              <div style={{ display: "flex" }}>
                <Alert
                  message={
                    <b>
                      <Tag color="green">${total}</Tag>
                    </b>
                  }
                  type="info"
                />
                <Alert
                  style={{ marginLeft: 10 }}
                  message={
                    <b>
                      <Tag color="green">${(total / 12).toFixed(2)}/mes</Tag>
                    </b>
                  }
                  type="info"
                />
              </div>

              <Button
                onClick={() => {
                  setInvoice(null);
                  setShowModalInvoice(true);
                }}
                type="primary"
              >
                Nueva factura
              </Button>
            </Footer>
          );
        }}
      />
      {showModalInvoice && (
        <NewInvoice
          invoice={invoice}
          visible={showModalInvoice}
          setShowModalInvoice={setShowModalInvoice}
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
      invoices: state.invoices.list,
      loading: isLoading(FETCH_INVOICES, state),
      deleting: isLoading(DELETE_INVOICE, state),
      loggingout: isLoading(LOGOUT, state)
    }),
    {
      fetchiInvoices,
      deleteInvoice,
      logout
    }
  )
);

export default enhancer(InvoicesList);
