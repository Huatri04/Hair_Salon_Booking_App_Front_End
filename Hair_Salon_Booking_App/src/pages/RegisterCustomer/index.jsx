import React from "react";
import { Input, Form, Button } from "antd";
import "./index.css";
import Register_template from "../../components/register_template";
function LoginCustomer() {
  return (
    <Register_template>
      <Form
        labelCol={{
          span: 24,
        }}
      >
        <Form.Item label="Phone Number" name="username" className="item">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" className="item">
          <Input />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirn_password">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="button">SIGN UP</Button>
        </Form.Item>
        <Form.Item className="sign_in">
          Already have account?{" "}
          <a href="http://localhost:5173/loginCustomer">Sign in</a>
        </Form.Item>
      </Form>
    </Register_template>
  );
}

export default LoginCustomer;
