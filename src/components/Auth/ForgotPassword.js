import React from "react";
import * as R from "ramda";
import { Input, Modal, Form, Button, Icon } from "antd";
import { connect } from "react-redux";
import { compose } from "recompose";
import { sendEmailPassword, RECOVERY_PASSWORD } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const ForgotPassword = ({
  form,
  visible,
  setForgot,
  sendEmailPassword,
  loading
}) => {
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={() => !loading && setForgot(false)}
      maskClosable={false}
      title={`Ingrese su email`}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="default"
          onClick={() => setForgot(false)}
        >
          Cerrar
        </Button>,
        <Button
          key="create"
          icon="mail"
          loading={loading}
          type="primary"
          onClick={ev => {
            ev.preventDefault();
            form.validateFields(async (err, values) => {
              if (!err) {
                await sendEmailPassword(R.dissoc("confirm", values));
                setForgot(false);
              }
            });
          }}
        >
          Enviar
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <Form.Item label="Email:" name="email">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Debe ingresar un email válido"
              },
              {
                required: true,
                message: "Este campo no puede estar vacío"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="ejemplo@ejemplo.com"
              autoComplete="email"
            />
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
      loading: isLoading(RECOVERY_PASSWORD, state)
    }),
    { sendEmailPassword }
  )
);

export default enhancer(ForgotPassword);
