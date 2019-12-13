import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { compose } from "recompose";
import { Icon, Input, Button, Form } from "antd";
import { login, LOGIN } from "../store/actions/user";
import { isLoading } from "../utils/actions";
import SignUp from "./SignUp";

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  margin: 0 auto;
  margin-top: 50px;
  width: 300px;
  background: whitesmoke;
  border-radius: 15px;

  .login-form {
    width: 100%;
  }
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;

const WrapperButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Login = ({ form, login, loading }) => {
  const { getFieldDecorator } = form;
  const [showSignUp, setSignUp] = useState(false);
  return (
    <Content>
      <Form
        onSubmit={ev => {
          ev.preventDefault();
          form.validateFields(async (err, values) => {
            if (!err) {
              await login(values);
            }
          });
        }}
        className="login-form"
      >
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Debe ingresar el usuario" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              autoComplete="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Debe ingresar la contraseña" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Contraseña"
            />
          )}
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Iniciar sesión
        </Button>
        <WrapperButton>
          <Button type="link" onClick={() => setSignUp(true)}>
            Quiero registrarme
          </Button>
        </WrapperButton>
      </Form>
      {showSignUp && (
        <SignUp
          visible={showSignUp}
          setSignUp={showSignUp => setSignUp(showSignUp)}
        />
      )}
    </Content>
  );
};

const enhancer = compose(
  Form.create(),
  connect(
    state => ({
      loading: isLoading(LOGIN, state)
    }),
    { login }
  )
);

export default enhancer(Login);
