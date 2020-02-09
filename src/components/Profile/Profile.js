import React from "react";
import { Row, Col } from "antd";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  return (
    <Row>
      <Col xs={24} md={12}>
        <PersonalInformation />
      </Col>
      <Col xs={24} md={12}>
        <ChangePassword />
      </Col>
    </Row>
  );
};

export default Profile;
