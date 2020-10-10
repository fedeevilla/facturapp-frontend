import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { Button, Form, Row, Input } from "antd";
import { isLoading } from "../../utils/actions";
import { recoveryPassword, RECOVERY_PASSWORD } from "../../store/actions/user";

const Container = styled.div`
  justify-content: center;
  padding: 30px;
  margin: 0 auto;
  margin-top: 50px;
  width: 500px;
  background: whitesmoke;
  border-radius: 15px;
`;

const RecoveryPassword = ({ pathname, form }) => {
  const { getFieldDecorator } = form;

  const loading = useSelector((state) => isLoading(RECOVERY_PASSWORD, state));
  const dispatch = useDispatch();

  const token = R.split("/recovery/", pathname)[1];
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
    <Form layout="horizontal">
      <Container>
        <h1>Restaurar contraseña</h1>
        <Form.Item label="Nueva contraseña" hasFeedback>
          {getFieldDecorator("password", {
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
        <Row type="flex" justify="start">
          <Form.Item>
            <Button
              type="primary"
              icon="save"
              loading={loading}
              onClick={(ev) => {
                ev.preventDefault();
                form.validateFields(async (err, values) => {
                  if (!err) {
                    await dispatch(
                      recoveryPassword({
                        token,
                        formData: R.dissoc("confirm", values),
                      })
                    );
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

export default Form.create()(RecoveryPassword);
