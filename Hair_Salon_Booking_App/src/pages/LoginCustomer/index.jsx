import React from "react";
import Authentication_template from "../../components/authen_template/index.jsx";
import { Input, Form, Button } from "antd";
import "./index.css";
function LoginCustomer() {
  return (
    <Authentication_template>
      <Form
        labelCol={{
          span: 24,
        }}
      >
        <Form.Item label="Phone Number" name="username" className="item">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="button">SIGN IN</Button>
        </Form.Item>
        <Form.Item className="sign_up">
          No account yet?{" "}
          <a href="http://localhost:5173/registerCustomer">Sign in</a>
        </Form.Item>
      </Form>
    </Authentication_template>
  );
}

export default LoginCustomer;
