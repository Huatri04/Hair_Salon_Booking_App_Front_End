import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useState } from "react";
import { updateProfile } from "../../redux/features/userSlice"; // Correct path to your slice
import { useForm } from "antd/es/form/Form";

function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const response = await api.put("profile", values);
      dispatch(updateProfile(values)); // Dispatch updateProfile action
      toast.success("Successful update");

      form.resetFields(["oldPassword", "newPassword"]); // Reset the fields
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile_container">
      <Form
        form={form}
        labelCol={{ span: 24 }}
        initialValues={{
          phoneNumber: user.phoneNumber,
          email: user.email,
          name: user.name,
        }}
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
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
          label="Email"
          name="email"
          rules={[
            {
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            {
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              message: "Please input your new password!",
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MyProfile;
