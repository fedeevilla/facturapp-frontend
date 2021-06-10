import React, { useCallback, useState } from "react";
import styled from "styled-components";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Row } from "antd";

import { changePassword, CHANGE_PASSWORD } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const Container = styled.div`
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin: 20px;
`;

const ChangePassword = ({ form }) => {
  const loading = useSelector((state) => isLoading(CHANGE_PASSWORD, state));
  const dispatch = useDispatch();

  const { getFieldDecorator, resetFields } = form;

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
      if (value && value !== form.getFieldValue("newPassword")) {
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
    <Form layout="horizontal">
      <Container>
        <h2>Seguridad</h2>
        <Form.Item hasFeedback label="Contraseña actual">
          {getFieldDecorator("oldPassword", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
              {
                min: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item hasFeedback label="Nueva contraseña">
          {getFieldDecorator("newPassword", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese su nueva contraseña",
              },
              {
                min: 6,
                message: "Debe tener al menos 6 caracteres",
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
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
        <Row justify="start" type="flex">
          <Form.Item>
            <Button
              icon="save"
              loading={loading}
              type="primary"
              onClick={(ev) => {
                ev.preventDefault();
                form.validateFields(async (err, values) => {
                  if (!err) {
                    await dispatch(changePassword(R.dissoc("confirm", values)));
                    resetFields();
                  }
                });
              }}
            >
              Actualizar
            </Button>
          </Form.Item>
        </Row>
      </Container>
    </Form>
  );
};

export default Form.create()(ChangePassword);
