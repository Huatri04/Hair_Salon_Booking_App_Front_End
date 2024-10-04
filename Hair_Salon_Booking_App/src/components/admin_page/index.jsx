import React, { useEffect, useState } from "react";
import "./index.css";

import { Layout, Menu, theme } from "antd";
import {
  Link,
  Outlet,
 
} from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Admin = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key) {
    return {
      key,
      label: <Link to={`/admin_page/${key}`}> {label}</Link>,
    };
  }

  const items = [
    getItem("Home", "home_admin"),
    getItem("Quản lý dịch vụ", "services"),
    getItem("Quản lí nhân viên ", "employee"),
    getItem("Quản lí đơn hỗ trợ phần mềm ", "SoftwareSupportOrderManagement"),
    getItem("Quản lí khách hàng  ", "CustomerAccountManagememnt"),
    getItem("Quản lí phần mềm  ", "SupportApplicationOfCustomer"),
  ];

  return (
    <Layout className="layout_container">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} selectedKeys={""} />
      </Sider>
      <Layout>
        <Header
          className="header_container"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="logo">
            <img
              className="image"
              src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/logo.jpg?alt=media&token=40cbabc8-de6a-4aa4-9315-103363c2ccd1"
              alt=""
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="content_container"
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
