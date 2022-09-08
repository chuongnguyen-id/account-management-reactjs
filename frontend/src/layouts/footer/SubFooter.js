import React from "react";
import "antd/dist/antd.min.css";
import { Space } from "antd";
import {
  FacebookOutlined,
  GooglePlusOutlined,
  TwitterOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Icon, Logo } from "../../styles";

function SubFooter() {
  return (
    <Icon>
      <Space size={20}>
        <FacebookOutlined />
        <GooglePlusOutlined />
        <TwitterOutlined />
        <Logo src="logo192.png" />
        <EnvironmentOutlined />
        <PhoneOutlined />
        <MailOutlined />
      </Space>
    </Icon>
  );
}

export default SubFooter;
