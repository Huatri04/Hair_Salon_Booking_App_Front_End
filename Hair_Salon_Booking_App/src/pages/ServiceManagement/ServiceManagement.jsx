import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { upload } from "@testing-library/user-event/dist/cjs/utility/upload.js";
import uploadFile from "../../utils/file";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ServiceManagement() {
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

  const [services, setServices] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const fethService = async () => {
    const reponse = await api.get("/service");

    console.log(reponse.data);
    setServices(reponse.data);

    //GET => Lấy dữ liệu
  };
  //[]: dependency array
  useEffect(() => {
    fethService();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },

    {
      title: "Timeofservice",
      dataIndex: "timeOfService",
      key: "timeOfService",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img src={image} alt="" width={200} />;
      },
    },
  ];
  const handleOpenModal = () => {
    setopenModal(true);
  };

  const handleCloseModal = () => {
    setopenModal(false);
  };
  const handlecSubmitService = async (values) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      console.log(url);
      values.image = url;
    }
    try {
      setSubmitting(true); //trước khi gọi api thì load tới khi nào ngừng load
      const response = await api.post("/service", values); //lỗi
      // ==> thành công
      toast("Sucessfully create new Service");
      setopenModal(false);
      setSubmitting(false);
      //   //clear dữ liệu cũ
      form.resetFields();
      //   //lấy lại danh sách mới | hiện nút ok khi sucessfully NE
      fethService();
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <h1>Service Management</h1>
      <Button onClick={handleOpenModal}>Create new Service</Button>
      <Table columns={columns} dataSource={services} rowKey="id" />
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new service"
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handlecSubmitService} form={form}>
          <Form.Item
            label="Name "
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="cost "
            name="cost"
            rules={[
              {
                required: true,
                message: "Please input cost!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="timeOfService(minutes) "
            name="timeOfService"
            rules={[
              {
                required: true,
                message: "Please input timeOfService!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description:"
            name="description"
            labelCol={{ span: 24 }}
          >
            <TextArea rows={4} placeholder="Enter your text here" />
          </Form.Item>
          <Form.Item label="Image" name="image">
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
        </Form>
      </Modal>
    </div>
  );
}

export default ServiceManagement;
