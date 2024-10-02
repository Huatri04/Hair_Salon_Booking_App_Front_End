import React from "react";
import "./index.css";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home_admin from "../../pages/Home_admin";
const { Header, Sider, Content } = Layout;
const Manager_page = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key) {
    return {
      key,
      label: <Link to={`/manager_page/${key}`}> {label}</Link>,
    };
  }
  const items = [
    getItem("Quản lý feedback", "feedbacks"),
    getItem("Quản lý ca làm việc", "feedbacks"),
    getItem("Quản lý voucher", "feedbacks"),
    getItem("Quản lý lương nhân viên", "feedbacks"),
    getItem("Quản lý giao dịch", "feedbacks"),
    getItem("Hỗ trợ phần mềm", "feedbacks"),
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
        <Menu theme="dark" mode="inline" items={items} />
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
            <Routes>
              <Route path="/" element={<Home_admin />} />
            </Routes>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Manager_page;
