import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as R from "ramda";
import {
  InputNumber,
  Modal,
  Form,
  Button,
  DatePicker,
  Popconfirm,
  Select,
} from "antd";
import {
  CREATE_INVOICE,
  UPDATE_INVOICE,
  createInvoice,
  updateInvoice,
} from "../store/actions/invoices";
import { isLoading } from "../utils/actions";
import Upload from "../components/Upload";
import { PROVIDER } from "./selector";

const { Option } = Select;

const NewInvoice = ({ form, visible, setShowModalInvoice, invoice }) => {
  const isCreating = useSelector((state) => isLoading(CREATE_INVOICE, state));
  const isUpdating = useSelector((state) => isLoading(UPDATE_INVOICE, state));

  const loading = useMemo(() => isCreating || isUpdating, [
    isCreating,
    isUpdating,
  ]);

  const dispatch = useDispatch();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  useEffect(() => {
    if (invoice) {
      setFieldsValue({
        ...R.assoc("date", moment(invoice.date), invoice),
      });
    }
  }, [invoice, setFieldsValue]);

  return (
    <Modal
      width="700px"
      visible={visible}
      destroyOnClose={true}
      closable={!loading}
      onCancel={() => !loading && setShowModalInvoice(false)}
      maskClosable={false}
      title={invoice ? "Editar factura" : "Nueva factura"}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="default"
          disabled={loading}
          onClick={() => !loading && setShowModalInvoice(false)}
        >
          Cerrar
        </Button>,
        <Button
          key="save"
          icon="save"
          type="primary"
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
              if (!err) {
                if (!invoice) {
                  dispatch(
                    createInvoice({
                      ...values,
                      date: new Date(values.date).getTime(),
                    })
                  );
                } else {
                  dispatch(
                    updateInvoice({
                      idInvoice: invoice._id,
                      formData: {
                        ...values,
                        date: new Date(values.date).getTime(),
                      },
                    })
                  );
                }
                setShowModalInvoice(false);
              }
            });
          }}
        >
          Guardar
        </Button>,
      ]}
    >
      <Form layout="horizontal">
        <Form.Item label="Fecha:" name="date">
          {getFieldDecorator("date", {
            initialValue: moment(Date.now()),
            rules: [
              {
                required: true,
                message: "Debe completar este campo",
              },
            ],
          })(
            <DatePicker
              placeholder="Seleccione un día"
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              disabledDate={(calendarDate) =>
                calendarDate.valueOf() > Date.now()
              }
            />
          )}
        </Form.Item>
        <Form.Item label="Proveedor:" name="provider">
          {getFieldDecorator("provider", {
            initialValue: "C",
          })(
            <Select>
              <Option value="A">{PROVIDER["A"]}</Option>
              <Option value="B">{PROVIDER["B"]}</Option>
              <Option value="C">{PROVIDER["C"]}</Option>
              <Option value="E">{PROVIDER["E"]}</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Monto:" name="amount">
          {getFieldDecorator("amount", {
            rules: [
              {
                required: true,
                message: "Debe completar este campo",
              },
            ],
          })(
            <InputNumber
              min={0}
              placeholder="$56000"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item label="Tipo de Factura:" name="type">
          {getFieldDecorator("type", {
            initialValue: "C",
          })(
            <Select>
              <Option value="A">Factura A</Option>
              <Option value="B">Factura B</Option>
              <Option value="C">Factura C</Option>
              <Option value="E">Factura E</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="PDF:" name="pdf" style={{ display: "flex" }}>
          {getFieldDecorator("pdf")(
            <>
              {!getFieldValue("pdf") && (
                <Upload
                  label={"Seleccionar PDF"}
                  options={{ upload_preset: "invoices" }}
                  action={process.env.REACT_APP_CLOUDINARY_URI}
                  onChange={(pdf) => {
                    setFieldsValue({ pdf });
                  }}
                />
              )}
              {getFieldValue("pdf") && (
                <>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={getFieldValue("pdf")}
                  >
                    <Button
                      type="primary"
                      icon="file"
                      style={{ marginLeft: 20 }}
                    >
                      Ver Factura
                    </Button>
                  </a>
                  <Popconfirm
                    title="¿Estás seguro?"
                    onConfirm={() => setFieldsValue({ pdf: null })}
                    okText="Eliminar"
                    cancelText="Cancelar"
                  >
                    <Button
                      shape="circle"
                      icon="delete"
                      type="danger"
                      style={{ marginLeft: 20, verticalAlign: "middle" }}
                    />
                  </Popconfirm>
                </>
              )}
            </>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(NewInvoice);
