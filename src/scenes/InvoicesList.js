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
import { PROVIDER } from "./selector";
import ReportInvoices from "../components/Invoice/ReportInvoices";

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
  idLoading,
  duplicateInvoice,
  duplicating
}) => {
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    R.isNil(invoices) && fetchiInvoices();
  }, [fetchiInvoices, invoices]);

  const sortedInvoices = R.sort(R.descend(R.prop("date")), invoices || []);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: date => moment(date).format("DD/MM/YYYY")
    },
    {
      title: "Proveedor",
      dataIndex: "provider",
      key: "provider",
      render: provider => {
        return PROVIDER[provider];
      }
    },
    {
      title: "Tipo Factura",
      dataIndex: "type",
      key: "type",
      render: type => {
        return `Factura ${type}`;
      }
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (_, { amount }) => {
        return <b>$ {amount.toFixed(2)}</b>;
      }
    },
    {
      title: "Acción",
      dataIndex: "_id",
      key: "action",
      render: _id => {
        const invoice = R.find(R.propEq("_id", _id), sortedInvoices);

        return (
          <>
            <Tooltip title="Editar factura" placement="bottom">
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
              <Tooltip title="Eliminar factura" placement="bottom">
                <Button
                  loading={deleting && idLoading === _id}
                  shape="circle"
                  icon="delete"
                  type="danger"
                  style={{ marginRight: 20 }}
                />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="Duplicar factura" placement="bottom">
              <Button
                onClick={async () => await duplicateInvoice(invoice)}
                loading={duplicating && idLoading === _id}
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
      <ReportInvoices invoices={sortedInvoices} />
      <Table
        style={{ width: 800, margin: "auto" }}
        loading={loading}
        columns={columns}
        dataSource={sortedInvoices}
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
          Cerrar Sesión
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
      idLoading: state.invoices.idLoading
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
