import React from "react";
import * as R from "ramda";
import { Input, Modal, Form, Button, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { sendEmailPassword, RECOVERY_PASSWORD } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const ForgotPassword = ({ form, visible, setForgot }) => {
  const loading = useSelector((state) => isLoading(RECOVERY_PASSWORD, state));
  const dispatch = useDispatch();

  const { getFieldDecorator } = form;

  return (
    <Modal
      destroyOnClose={true}
      footer={[
        <Button key="close" icon="close-circle" type="default" onClick={() => setForgot(false)}>
          Cerrar
        </Button>,
        <Button
          key="create"
          icon="mail"
          loading={loading}
          type="primary"
          onClick={(ev) => {
            ev.preventDefault();
            form.validateFields(async (err, values) => {
              if (!err) {
                await dispatch(sendEmailPassword(R.dissoc("confirm", values)));
                setForgot(false);
              }
            });
          }}
        >
          Enviar
        </Button>,
      ]}
      maskClosable={false}
      title={`Ingrese su email`}
      visible={visible}
      onCancel={() => !loading && setForgot(false)}
    >
      <Form layout="horizontal">
        <Form.Item label="Email:" name="email">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Debe ingresar un email válido",
              },
              {
                required: true,
                message: "Este campo no puede estar vacío",
              },
            ],
          })(
            <Input
              autoComplete="email"
              placeholder="ejemplo@ejemplo.com"
              prefix={<Icon style={{ color: "rgba(0,0,0,.25)" }} type="mail" />}
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ForgotPassword);
