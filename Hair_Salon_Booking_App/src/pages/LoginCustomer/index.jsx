import React from "react";
import Authentication_template from "../../components/authen_template/index.jsx";
import { Input, Form, Button } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import api from "../../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice.js";
function LoginCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await api.post("loginCustomer", values);
      dispatch(login(response.data));
      console.log(response.data);
      navigate("/*");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <Authentication_template>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <Form.Item
          label="Phone Number"
          name="phonenumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number!",
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
      <div className="sign_up">
        No account yet? <Link to={"/registerCustomer"}>Sign up</Link>
      </div>
    </Authentication_template>
  );
}

export default LoginCustomer;
