import React, { useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import moment from "moment";
import * as R from "ramda";
import { InputNumber, Modal, Form, Button, DatePicker } from "antd";
import {
  CREATE_PAYMENT,
  UPDATE_PAYMENT,
  createPayment,
  updatePayment
} from "../store/actions/payments";
import { isLoading } from "../utils/actions";

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
  const { getFieldDecorator, setFieldsValue } = form;

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
      onCancel={() => !loading && setShowModalPayment(false)}
      maskClosable={false}
      title="Nuevo Pago"
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
