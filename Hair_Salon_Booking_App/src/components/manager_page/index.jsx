import React from "react";
import "./index.css";
import { Descriptions, Layout, Menu, Modal, theme } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const Manager_page = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function handleMenuClick(e) {
    if (e.key === "loginEmployee") {
      dispatch(logout());
    }
    if (e.key === "employee_account") {
      <Modal open={true}>
        <h1>Halo</h1>
      </Modal>;
    }
  }
  function getItemOpenModal(label, key) {
    return {
      key,
      label,
    };
  }
  function getItemLogOut(label, key) {
    return {
      key,
      label: <Link to={`/${key}`}>{label}</Link>,
    };
  }

  function getItem(label, key) {
    return {
      key,
      label: <Link to={`/manager_page/${key}`}> {label}</Link>,
    };
  }
  const items = [
    getItem("Trang chủ", "home_employee"),
    getItemOpenModal("Tài khoản của tôi", "employee_account"),
    getItem("Quản lý feedback", "feedbacks"),
    getItem("Quản lý ca làm việc", "shiftManagement"),
    getItem("Quản lý voucher", "voucherProgram"),
    getItem("Quản lý lương nhân viên"),
    getItem("Quản lý giao dịch"),
    getItem("Hỗ trợ phần mềm"),
    getItemLogOut("Đăng xuất", "loginEmployee"),
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
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={null}
          items={items}
          onClick={handleMenuClick}
        />
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
            <Modal open={false} width={900}>
              <div className="description_container">
                <Descriptions title="User Info">
                  <Descriptions.Item label="UserName">
                    {user.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {user.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Role">
                    {user.role}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Modal>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Manager_page;
