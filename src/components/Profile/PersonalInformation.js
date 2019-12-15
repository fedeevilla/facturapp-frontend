import React, { useEffect } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Button, Form, Input, Icon, Row, Col, Avatar } from "antd";
import { getOptimizedImage } from "../../utils/images";
import Upload from "../Upload";
import { updateUser, UPDATE_USER } from "../../store/actions/user";
import { isLoading } from "../../utils/actions";

const Container = styled.div`
  background: whitesmoke;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 25px;
`;

const PersonalInformation = ({ form, user, updateUser, loading }) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

  useEffect(() => {
    if (user) {
      setFieldsValue(user);
    }
  }, [setFieldsValue, user]);

  return (
    <Form layout="horizontal">
      <Container>
        <h2>Información personal</h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Nombre:" name="name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Este campo no puede estar vacío"
                  },
                  {
                    min: 5,
                    message: "Debe tener al menos 5 caracteres"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  autoComplete="name"
                  placeholder="Ingrese un nombre"
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Email:" name="email">
              {getFieldDecorator("email")(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  readOnly
                  autoComplete="email"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Avatar" name="avatar">
              {getFieldDecorator("avatar")(
                <>
                  <Avatar
                    size="large"
                    icon="user"
                    src={
                      getFieldValue("avatar") &&
                      getOptimizedImage(getFieldValue("avatar"))
                    }
                    shape="circle"
                    className="avatar"
                    style={{ marginRight: 20 }}
                  />
                  <Upload
                    label={"Seleccionar imagen"}
                    options={{ upload_preset: "invoices" }}
                    action={process.env.REACT_APP_CLOUDINARY_URI}
                    onChange={avatar => {
                      setFieldsValue({ avatar });
                    }}
                  />
                </>
              )}
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
                    await updateUser(values);
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
      user: state.user,
      loading: isLoading(UPDATE_USER, state)
    }),
    { updateUser }
  )
);

export default enhancer(PersonalInformation);
