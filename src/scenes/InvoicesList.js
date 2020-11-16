import React, { useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import * as R from "ramda";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../utils/actions";
import {
  deleteInvoice,
  DELETE_INVOICE,
  duplicateInvoice,
  DUPLICATE_INVOICE,
} from "../store/actions/invoices";
import Balances from "../components/Balances";
import NewInvoice from "./NewInvoice";
import { PROVIDER } from "./selector";
import ReportInvoices from "../components/Invoice/ReportInvoices";
import useWindowDimensions from "../hooks/useWindowDimensions";

const WIDTH_BREAKPOINT = 630;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InvoicesList = () => {
  const { width } = useWindowDimensions();
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const invoices = useSelector(({ invoices }) => invoices.list);
  const idLoading = useSelector(({ invoices }) => invoices.idLoading);
  const deleting = useSelector((state) => isLoading(DELETE_INVOICE, state));
  const duplicating = useSelector((state) =>
    isLoading(DUPLICATE_INVOICE, state)
  );

  const dispatch = useDispatch();

  const sortedInvoices = useMemo(
    () => R.sort(R.descend(R.prop("date")), invoices || []),
    [invoices]
  );

  const columns = useMemo(
    () => [
      {
        title: "Fecha",
        dataIndex: "date",
        key: "date",
        render: (date) => {
          return (
            <div>
              <p style={{ textAlign: "center", marginBottom: 0, fontSize: 12 }}>
                {moment(date).format("DD/MM/YYYY")}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 10,
                  marginBottom: 0,
                }}
              >
                {moment(date).format("HH:mm:ss")}
              </p>
            </div>
          );
        },
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
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
                onConfirm={() => dispatch(deleteInvoice(_id))}
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
                    onClick={() => dispatch(duplicateInvoice({...invoice, date: new Date().getTime()}))}
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
            </div>
          );
        },
      },
    ],
    [deleting, dispatch, duplicating, idLoading, sortedInvoices, width]
  );

  return (
    <Wrapper>
      <ReportInvoices invoices={sortedInvoices} />
      <Balances />
      <Table
        style={{ margin: "auto" }}
        loading={duplicating || deleting}
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

export default InvoicesList;
