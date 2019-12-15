import React, { useState } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import * as R from "ramda";
import { connect } from "react-redux";
import { Button, Form, Input, Row, Col } from "antd";
import { changePassword, CHANGE_PASSWORD } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const Container = styled.div`
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 25px;
`;

const ChangePassword = ({ form, changePassword, loading }) => {
  const { getFieldDecorator, resetFields } = form;

  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Las contraseñas no coinciden");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Form layout="horizontal">
      <Container>
        <h2>Seguridad</h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Contraseña actual" hasFeedback>
              {getFieldDecorator("oldPassword", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña"
                  },
                  {
                    min: 6,
                    message: "Debe tener al menos 6 caracteres"
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Nueva contraseña" hasFeedback>
              {getFieldDecorator("newPassword", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su nueva contraseña"
                  },
                  {
                    min: 6,
                    message: "Debe tener al menos 6 caracteres"
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Confirmar contraseña" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Por favor confirme su contraseña"
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
          </Col>
        </Row>

        <Row type="flex" justify="start">
          <Form.Item>
            <Button
              type="primary"
              icon="save"
              loading={loading}
              onClick={ev => {
                ev.preventDefault();
                form.validateFields(async (err, values) => {
                  if (!err) {
                    await changePassword(R.dissoc("confirm", values));
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

const enhancer = compose(
  Form.create(),
  connect(
    state => ({
      loading: isLoading(CHANGE_PASSWORD, state)
    }),
    { changePassword }
  )
);

export default enhancer(ChangePassword);
