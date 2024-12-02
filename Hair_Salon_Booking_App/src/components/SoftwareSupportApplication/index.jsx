import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { Button, Form, Input, Modal, Pagination, Table } from "antd";
import "./index.css";
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

function SoftwareSupportApplication() {
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

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Page size

  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, size = 8) => {
    try {
      const response = await api.get(
        `softwareSupportApplication/employee?page=${page - 1}&size=${size}`
      );
      setData(response.data.content);
      setTotal(response.data.totalElement); // Set total items for pagination
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData(currentPage, pageSize); // Fetch data on page load
  }, [currentPage, pageSize]);
  const columns = [
    {
      title: "ID",
      dataIndex: "softwareSupportApplicationId",
      key: "softwareSupportApplicationId",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Time Create",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const date = new Date(record.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => {
        return <img src={img} alt="" width={200} />;
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleOk = () => {
    form.submit(); // Trigger form submission
  };

  const handleFinish = async (values) => {
    setShowModal(false);

    try {
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
      const response = await api.post("softwareSupportApplication", values);
      toast.success("Successful submission");
      fetchData(currentPage, pageSize); // Refresh data after submission
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  return (
    <div>
      <div className="button_container">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add
        </Button>
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOk} // Use handleOk for form submission
        loading={loading}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            label="Description:"
            name="description"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter your text here" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="img"
            rules={[
              {
                required: true,
                message: "Please input Image!",
              },
            ]}
          >
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
      </Modal>

      <Table dataSource={data} columns={columns} pagination={false} />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={8}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
    </div>
  );
}

export default SoftwareSupportApplication;
