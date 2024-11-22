import { Button, Form, Input, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { updateProfile } from "../../redux/features/userSlice"; // Correct path to your slice
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import uploadFile from "../../utils/file";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ProfileEmployee() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      if (fileList.length > 0) {
        const file = fileList[0];
        console.log(file);
        const url = await uploadFile(file.originFileObj);
        values.img = url; // Set the image URL to values
      }
    } catch (uploadError) {
      toast.error("File upload failed: " + uploadError.message);
      return; // Exit the function to prevent API call if upload fails
    }
    try {
      setLoading(true);
      const response = await api.put("profileEmployee", values);
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
    <div className="profile_container" style={{ marginTop: 150 }}>
      <Form
        className="form_fields_container"
        form={form}
        labelCol={{ span: 24 }}
        initialValues={{
          id: user.employeeId,
          phoneNumber: user.phoneNumber,
          email: user.email,
          name: user.name,
        }}
        onFinish={handleUpdate}
      >
        <div className="form_container">
          <Form.Item label="id" name="id">
            <Tag color="blue">{user.employeeId}</Tag>
          </Form.Item>
          <Form.Item
            label="name"
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
        </div>
        <div className="flex_container">
          <h1>Avatar</h1>
          <img src={user.img} alt="" width={200} />
          <Form.Item label="Image" name="img">
            <Upload
              action="https://api.allorigins.win/get?url=https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ProfileEmployee;
