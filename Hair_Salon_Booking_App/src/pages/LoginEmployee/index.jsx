import React from "react";
import Authentication_template from "../../components/authen_template/index.jsx";
import { Input, Form, Button } from "antd";
import api from "../../config/axios.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice.js";
import { Link, useNavigate } from "react-router-dom";
function LoginEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await api.post("loginEmployee", values);
      dispatch(login(response.data));
      console.log(response.data);
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      if (role === "Admin") navigate("/adminPage");
      if (role === "Manager") navigate("/manager_page");
      if (role === "Staff") navigate("/staff_page");
      if (role === "Stylist") navigate("/stylistPage");

      toast.success("Log in thành công");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <Authentication_template>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 6,
              message: "Username must be at least 6 characters!",
            },
            {
              pattern: /^\S+$/,
              message: "Username must not contain spaces!",
            },
            {
              pattern: /^[^\u00C0-\u024F\u1E00-\u1EFF]+$/,
              message: "Username must not contain Vietnamese characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </Authentication_template>
  );
}

export default LoginEmployee;
