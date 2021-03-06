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
    [confirmDirty]
  );

  const compareToFirstPassword = useCallback(
    (rule, value, callback) => {
      if (value && value !== form.getFieldValue("password")) {
        callback("Las contraseñas no coinciden");
      } else {
        callback();
      }
    },
    [form]
  );

  const validateToNextPassword = useCallback(
    (rule, value, callback) => {
      if (value && confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    [confirmDirty, form]
  );

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={() => !loading && setSignUp(false)}
      maskClosable={false}
      title={`Nuevo usuario`}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="default"
          onClick={() => setSignUp(false)}
        >
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              autoComplete="name"
              placeholder="Ingrese su nombre"
            />
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
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="ejemplo@ejemplo.com"
              autoComplete="email"
            />
          )}
        </Form.Item>
        <Form.Item label="Contraseña" hasFeedback>
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
        <Form.Item label="Confirmar contraseña" hasFeedback>
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
