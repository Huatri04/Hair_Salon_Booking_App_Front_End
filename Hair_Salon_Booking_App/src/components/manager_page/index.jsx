import React, { useEffect } from "react";
import "./index.css";
import { Descriptions, Layout, Menu, Modal, theme } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { useSelector } from "react-redux";
import Home_admin from "../Home_employee";
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
  }

  function getItem(label, key) {
    return {
      key,
      label: <Link to={`/${key}`}>{label}</Link>,
    };
  }

  const items = [
    getItem("Trang chủ", "manager_page"),
    getItem("Tài khoản của tôi", "manager_page/employee_account"),
    getItem("Quản lý Stylist", "manager_page/stylistManagement"),
    getItem("Quản lý ca làm việc", "manager_page/shiftInWeek"),
    getItem("Danh sách ca làm việc( Nhân viên)", "manager_page/shiftEmployee"),
    getItem("Quản lý những người chưa đăng kí ca", "manager_page/shiftFree"),
    getItem("Quản lý những người đăng kí ca", "manager_page/shiftAvailable"),
    getItem("Quản lý giao dịch", "manager_page/transactionManagement"),
    getItem("Quản lý feedbacks", "manager_page/feedbackManagement"),
    getItem("Quản lý basic salaries", "manager_page/manage_basic_salary"),
    getItem("Quản lý salary months", "manager_page/salaryMonths"),
    getItem("Quản lý voucher programs", "manager_page/voucherProgram"),
    getItem("Dash Board", "manager_page/dash_board"),
    getItem("Hỗ trợ phần mềm", "manager_page/softwareSupport"),
    getItem("Đăng xuất", "loginEmployee"),
  ];
  return (
    <Layout className="layout_container">
      <Sider
        width={"280px"}
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
