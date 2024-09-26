import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import "./index.css";
import About from "../../pages/About";

function Default_template({ children }) {
  const { Header, Content, Footer } = Layout;
  const [current, setCurrent] = useState([]);
  const [content, setContent] = useState([]);

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
        setContent(<div>Contact content</div>);
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
          setContent(<div>Contact content</div>);
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
            src="https://copilot.microsoft.com/images/blob?bcid=Swj3qOZF74wHMnEKYrWcKYtB7Z0m.....w8"
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
        <div className="menu_options">Sign In</div>
      </Header>
      <Content className="content_container" style={{ padding: "0 50px" }}>
        {content}
      </Content>
      <Footer className="footer" style={{ textAlign: "center" }}>
        Address: 47 Hoang Dieu 2, Quan 9, thanh pho Ho Chi Minh
        <br />
        Phone number: 0886122578
      </Footer>
    </Layout>
  );
}

export default Default_template;
