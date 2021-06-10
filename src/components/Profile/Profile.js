import React from "react";
import { Row, Col } from "antd";

import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import SignOut from "./SignOut";

const Profile = () => {
  return (
    <>
      <Row>
        <Col md={12} xs={24}>
          <PersonalInformation />
        </Col>
        <Col md={12} xs={24}>
          <ChangePassword />
        </Col>
      </Row>
      <Row>
        <SignOut />
      </Row>
    </>
  );
};

export default Profile;
