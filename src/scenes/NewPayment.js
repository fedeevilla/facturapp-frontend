import React, { useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import moment from "moment";
import * as R from "ramda";
import { InputNumber, Modal, Form, Button, DatePicker, Popconfirm } from "antd";
import {
  CREATE_PAYMENT,
  UPDATE_PAYMENT,
  createPayment,
  updatePayment
} from "../store/actions/payments";
import { isLoading } from "../utils/actions";
import Upload from "../components/Upload";

const { MonthPicker } = DatePicker;

const NewPayment = ({
  form,
  visible,
  setShowModalPayment,
  loading,
  createPayment,
  payment,
  updatePayment
}) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  useEffect(() => {
    if (payment) {
      setFieldsValue({
        ...R.assoc("date", moment(payment.date), payment)
      });
    }
  }, [setFieldsValue, payment]);

  return (
    <Modal
      width="700px"
      visible={visible}
      destroyOnClose={true}
      closable={!loading}
      onCancel={() => !loading && setShowModalPayment(false)}
      maskClosable={false}
      title={payment ? "Editar factura" : "Nueva factura"}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="defualt"
          disabled={loading}
          onClick={() => !loading && setShowModalPayment(false)}
        >
          Cerrar
        </Button>,
        <Button
          key="save"
          icon="save"
          type="primary"
          loading={loading}
          onClick={e => {
            e.preventDefault();
            form.validateFields(async (err, values) => {
              if (!err) {
                if (!payment) {
                  await createPayment({
                    ...values,
                    date: new Date(values.date).getTime()
                  });
                } else {
                  await updatePayment({
                    idPayment: payment._id,
                    formData: {
                      ...values,
                      date: new Date(values.date).getTime()
                    }
                  });
                }
                setShowModalPayment(false);
              }
            });
          }}
        >
          Guardar
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <Form.Item label="Fecha:" name="date">
          {getFieldDecorator("date", {
            rules: [
              {
                required: true,
                message: "Debe completar este campo"
              }
            ]
          })(
            <MonthPicker
              placeholder="Seleccione un mes"
              style={{ width: "100%" }}
              format="MMMM [de] YYYY"
            />
          )}
        </Form.Item>
        <Form.Item label="Monto:" name="amount">
          {getFieldDecorator("amount", {
            rules: [
              {
                required: true,
                message: "Debe completar este campo"
              }
            ]
          })(
            <InputNumber
              min={0}
              placeholder="$56000"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item label="Dólar:" name="dollar">
          {getFieldDecorator("dollar")(
            <InputNumber min={0} placeholder="20" style={{ width: "100%" }} />
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
                  onChange={pdf => {
                    setFieldsValue({ pdf });
                  }}
                />
              )}
              {getFieldValue("pdf") && (
                <>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={payment.pdf}
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
                      style={{ marginLeft: 20 }}
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

const enhancer = compose(
  Form.create(),
  connect(
    state => ({
      loading:
        isLoading(CREATE_PAYMENT, state) || isLoading(UPDATE_PAYMENT, state)
    }),
    { createPayment, updatePayment }
  )
);

export default enhancer(NewPayment);
