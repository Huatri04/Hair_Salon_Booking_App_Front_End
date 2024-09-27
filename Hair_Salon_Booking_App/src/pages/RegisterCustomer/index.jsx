import React from "react";
import { Input, Form, Button } from "antd";
import "./index.css";
import Register_template from "../../components/register_template";
import { Link } from "react-router-dom";
function LoginCustomer() {
  const [form] = Form.useForm(); // Create a form instance

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };
  return (
    <Register_template>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Phone Number"
          name="username"
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

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              validator: (_, value) => {
                if (!value || form.getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
      <div className="sign_up">
        Already have account? <Link to={"/loginCustomer"}>Sign in</Link>
      </div>
    </Register_template>
  );
}

export default LoginCustomer;
