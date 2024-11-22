import { Button, Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import "./index.css";

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
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState([]);
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
      <Content className="content_container" style={{ padding: "0 0 0 18px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default Default_template;
