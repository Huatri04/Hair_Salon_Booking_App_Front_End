import { Button, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import "./index.css";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import { useNavigate } from "react-router-dom";
function Default_template({ children }) {
  const { Header, Content, Footer } = Layout;
  const [current, setCurrent] = useState([]);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const items = [
    { key: "1", label: "Trang chủ" },
    { key: "2", label: "Về chúng tôi" },
    { key: "3", label: "Contact" },
  ];

  const handleClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "1":
        setContent(children);
        localStorage.setItem("currentContent", "1");
        break;
      case "2":
        setContent(<About />);
        localStorage.setItem("currentContent", "2");
        break;
      case "3":
        setContent(<Contact />);
        localStorage.setItem("currentContent", "3");
        break;
      default:
        setContent(children);
        localStorage.setItem("currentContent", "1");
        break;
    }
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("currentContent");
    if (savedContent) {
      switch (savedContent) {
        case "1":
          setContent(children);
          break;
        case "2":
          setContent(<About />);
          break;
        case "3":
          setContent(<Contact />);
          break;
        default:
          setContent(children);
          break;
      }
      setCurrent(savedContent);
    }
  }, [children]);

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
          selectedKeys={[current]}
          onClick={handleClick}
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
        {content}
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
