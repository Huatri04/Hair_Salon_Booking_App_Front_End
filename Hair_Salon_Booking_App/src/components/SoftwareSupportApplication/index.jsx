import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { Button, Form, Input, Modal, Pagination, Table } from "antd";
import "./index.css";
function SoftwareSupportApplication() {
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
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleOk = () => {
    form.submit(); // Trigger form submission
    setShowModal(false);
  };

  const handleFinish = async (values) => {
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
            onFinish={handleFinish} // Handle form submission
          >
            <TextArea rows={4} placeholder="Enter your text here" />
          </Form.Item>
        </Form>
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
