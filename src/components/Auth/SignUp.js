import React, { useCallback, useState } from "react";
import * as R from "ramda";
import { Input, Modal, Form, Button, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { signup, SIGNUP } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const SignUp = ({ form, visible, setSignUp }) => {
  const loading = useSelector((state) => isLoading(SIGNUP, state));
  const dispatch = useDispatch();

  const { getFieldDecorator } = form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = useCallback(
    (e) => {
      const { value } = e.target;

      setConfirmDirty({ confirmDirty: confirmDirty || !!value });
    },
    [confirmDirty],
  );

  const compareToFirstPassword = useCallback(
    (rule, value, callback) => {
      if (value && value !== form.getFieldValue("password")) {
        callback("Las contraseñas no coinciden");
      } else {
        callback();
      }
    },
    [form],
  );

  const validateToNextPassword = useCallback(
    (rule, value, callback) => {
      if (value && confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    [confirmDirty, form],
  );

  return (
    <Modal
      destroyOnClose={true}
      footer={[
        <Button key="close" icon="close-circle" type="default" onClick={() => setSignUp(false)}>
          Cerrar
        </Button>,
        <Button
          key="create"
          icon="user-add"
          loading={loading}
          type="primary"
          onClick={(ev) => {
            ev.preventDefault();
            form.validateFields(async (err, values) => {
              if (!err) {
                await dispatch(signup(R.dissoc("confirm", values)));
                setSignUp(false);
              }
            });
          }}
        >
          Crear
        </Button>,
      ]}
      maskClosable={false}
      title={`Nuevo usuario`}
      visible={visible}
      onCancel={() => !loading && setSignUp(false)}
    >
      <Form layout="horizontal">
        <Form.Item label="Nombre:" name="name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Este campo no puede estar vacío",
              },
              {
                min: 5,
                message: "Debe tener al menos 5 caracteres",
              },
            ],
          })(
            <Input
              autoComplete="name"
              placeholder="Ingrese su nombre"
              prefix={<Icon style={{ color: "rgba(0,0,0,.25)" }} type="user" />}
            />,
          )}
        </Form.Item>
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
        <Form.Item hasFeedback label="Contraseña">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
              {
                validator: validateToNextPassword,
              },
              {
                min: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item hasFeedback label="Confirmar contraseña">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Por favor confirme su contraseña",
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(SignUp);
