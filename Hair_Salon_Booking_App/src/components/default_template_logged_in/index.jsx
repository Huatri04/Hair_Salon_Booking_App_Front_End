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

import Home from "../../pages/Home_logged_in";
import { Avatar, Drawer, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { resetCart } from "../../redux/features/cartSlide";

function Default_template_logged_in() {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

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
    getItem("Lịch sử tỏa sáng", "logged_in/historyOfServices"),
    getItem("Điểm trung thành", "logged_in/loyalPoints"),
    getItem("Hỗ trợ phần mềm", "logged_in/softwareSupportApplication"),
    getItem("Đăng xuất", ""),
  ];
  const items = [
    getItem("Trang chủ", "logged_in"),
    getItem("Về chúng tôi", "logged_in/about"),
    getItem("Liên hệ", "logged_in/contact"),
  ];

  function handleDrawerClick(e) {
    onClose();
    if (e.key === "") {
      dispatch(logout());
    }
  }

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
      <Drawer title={user.name} onClose={onClose} open={open}>
        <Menu
          theme="light"
          style={{
            width: 330,
          }}
          selectedKeys={" "}
          mode="inline"
          items={itemsList}
          onClick={handleDrawerClick}
        />
      </Drawer>
      <Content className="content_container" style={{ padding: "0 50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default Default_template_logged_in;
