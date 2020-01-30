import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import * as R from "ramda";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import { compose } from "recompose";
import { connect } from "react-redux";
import { isLoading } from "../utils/actions";
import {
  fetchiInvoices,
  FETCH_INVOICES,
  deleteInvoice,
  DELETE_INVOICE,
  duplicateInvoice,
  DUPLICATE_INVOICE
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
  justify-content: flex-end;
`;

const InvoicesList = ({
  invoices,
  fetchiInvoices,
  loading,
  deleteInvoice,
  deleting,
  logout,
  loggingout,
  idDeleting,
  duplicateInvoice,
  duplicating,
  idDuplicating
}) => {
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchiInvoices();
  }, [fetchiInvoices]);

  const sortedinvoices = R.sort(R.descend(R.prop("date")), invoices);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: date => moment(date).format("DD/MM/YYYY")
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
                  loading={deleting && idDeleting === _id}
                  shape="circle"
                  icon="delete"
                  type="danger"
                  style={{ marginRight: 20 }}
                />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="Duplicar factura">
              <Button
                onClick={async () => await duplicateInvoice(invoice)}
                loading={duplicating && idDuplicating === _id}
                shape="circle"
                icon="plus"
                type="dashed"
                style={{ marginRight: 20 }}
              />
            </Tooltip>
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
        style={{ width: 800, margin: "auto" }}
        loading={loading}
        columns={columns}
        dataSource={sortedinvoices}
        locale={{ emptyText: "Sin datos" }}
        rowKey="_id"
        footer={() => (
          <Footer>
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
        )}
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
      duplicating: isLoading(DUPLICATE_INVOICE, state),
      loggingout: isLoading(LOGOUT, state),
      idDeleting: state.invoices.idDeleting,
      idDuplicating: state.invoices.idDuplicating
    }),
    {
      fetchiInvoices,
      deleteInvoice,
      duplicateInvoice,
      logout
    }
  )
);

export default enhancer(InvoicesList);
