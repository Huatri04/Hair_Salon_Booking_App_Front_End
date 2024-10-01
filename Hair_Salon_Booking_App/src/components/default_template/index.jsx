import { Button, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import "./index.css";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "../../pages/Home";
function Default_template() {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState([]);
  const location = useLocation();

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
  const items = [
    getItem("Trang chủ", ""),
    getItem("Về chúng tôi", "about"),
    getItem("Liên hệ", "contact"),
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
          <Button type="primary" onClick={() => navigate("/loginCustomer")}>
            SIGN IN
          </Button>
          <Button onClick={() => navigate("/registerCustomer")}>SIGN UP</Button>
        </div>
      </Header>
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

export default Default_template;
