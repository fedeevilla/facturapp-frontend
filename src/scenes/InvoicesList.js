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
  DUPLICATE_INVOICE,
} from "../store/actions/invoices";

import NewInvoice from "./NewInvoice";
import { PROVIDER } from "./selector";
import ReportInvoices from "../components/Invoice/ReportInvoices";
import useWindowDimensions from "../hooks/useWindowDimensions";

const WIDTH_BREAKPOINT = 800;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  idLoading,
  duplicateInvoice,
  duplicating,
}) => {
  const { width } = useWindowDimensions();
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    !invoices && fetchiInvoices();
  }, [fetchiInvoices, invoices]);

  const sortedInvoices = R.sort(R.descend(R.prop("date")), invoices || []);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Proveedor",
      dataIndex: "provider",
      key: "provider",
      render: (provider) => {
        return PROVIDER[provider];
      },
    },
    {
      title: "Tipo Factura",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return `Factura ${type}`;
      },
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (_, { amount }) => {
        return <b>$ {amount.toFixed(2)}</b>;
      },
    },
    {
      title: "Acción",
      dataIndex: "_id",
      key: "action",
      render: (_id) => {
        const invoice = R.find(R.propEq("_id", _id), sortedInvoices);

        return (
          <>
            {width > WIDTH_BREAKPOINT && (
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
            )}
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
            {width > WIDTH_BREAKPOINT && (
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
            )}
            {width > WIDTH_BREAKPOINT && invoice.pdf && (
              <a target="_blank" rel="noopener noreferrer" href={invoice.pdf}>
                <Tooltip title="Ver factura">
                  <Button shape="circle" icon="file" type="default" />
                </Tooltip>
              </a>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <ReportInvoices invoices={sortedInvoices} />
      <Table
        style={{ margin: "auto" }}
        loading={loading}
        columns={
          width < WIDTH_BREAKPOINT
            ? [columns[0], columns[3], columns[4]]
            : columns
        }
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
    </Wrapper>
  );
};

const enhancer = compose(
  connect(
    (state) => ({
      invoices: state.invoices.list,
      loading: isLoading(FETCH_INVOICES, state),
      deleting: isLoading(DELETE_INVOICE, state),
      duplicating: isLoading(DUPLICATE_INVOICE, state),
      idLoading: state.invoices.idLoading,
    }),
    {
      fetchiInvoices,
      deleteInvoice,
      duplicateInvoice,
    }
  )
);

export default enhancer(InvoicesList);
