import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import Home from "../../pages/Home";
import { Avatar, Drawer, Layout, Menu } from "antd";
import { useSelector } from "react-redux";

function Default_template_logged_in() {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const savedKey = localStorage.getItem("SelectedKey");
    if (savedKey) {
      setSelectedKey(savedKey);
    }
  }, [navigate]);

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelectedKey(path);
    localStorage.setItem("SelectedKey", path);
  }, [location]);

  function handleMenuClick(e) {
    setSelectedKey(e.key);
    localStorage.setItem("SelectedKey", e.key);
  }

  function getItem(label, key) {
    return {
      key,
      label: <Link to={`/${key}`}> {label}</Link>,
    };
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const itemsList = [
    getItem("Thông tin của tôi", "logged_in/myProfile"),
    getItem("Lịch sử tỏa sáng"),
    getItem("Điểm trung thành"),
    getItem("Hỗ trợ phần mềm"),
  ];
  const items = [
    getItem("Trang chủ", "logged_in"),
    getItem("Về chúng tôi", "logged_in/about"),
    getItem("Liên hệ", "logged_in/contact"),
  ];

  return (
    <Layout className="layout">
      <Header className="header_container">
        <div className="logo">
          <img
            className="image"
            src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/logo.jpg?alt=media&token=40cbabc8-de6a-4aa4-9315-103363c2ccd1"
            alt=""
          />
        </div>

        <Menu
          className="menu_container"
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ lineHeight: "64px" }}
          items={items}
        ></Menu>

        <div className="menu_options">
          <Avatar onClick={showDrawer} size="large" icon={<UserOutlined />} />
        </div>
      </Header>
      <Drawer onClose={onClose} open={open}>
        <Menu
          theme="light"
          style={{
            width: 330,
          }}
          mode="inline"
          items={itemsList}
        />
      </Drawer>
      <Content className="content_container" style={{ padding: "0 50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Outlet />
      </Content>
      <Footer className="footer" style={{ textAlign: "center" }}>
        Address: 47 Hoang Dieu 2, Quan 9, thanh pho Ho Chi Minh
        <br />
        Phone number: 0886122578
        <br />
        Giờ mở cửa: Thứ Hai - Thứ Bảy: 7:00 AM - 8:00 PM
      </Footer>
    </Layout>
  );
}

export default Default_template_logged_in;
