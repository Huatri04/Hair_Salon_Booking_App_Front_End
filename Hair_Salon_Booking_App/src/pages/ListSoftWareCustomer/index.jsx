import { Table, Button, Modal, Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function SupportApplicationOfCustomer() {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  const fetchApplication = async () => {
    try {
      const response = await api.get(
        "/softwareSupportApplication/customers?page=0&size=10"
      );
      setApplications(response.data.content);
    } catch (error) {
      toast.error(error.response?.data || "Error fetching applications");
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleDeleteApplication = async (id) => {
    try {
      await api.delete(`/softwareSupportApplication/${id}`);
      toast.success("Application deleted successfully");
      fetchApplication(); // Refresh the application list
    } catch (error) {
      toast.error(error.response?.data || "Error deleting application");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "softwareSupportApplicationId",
      key: "softwareSupportApplicationId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer.name",
      key: "customer.name",
      render: (text, record) => record.customer.name,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const date = new Date(record.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            title="Are you sure you want to delete this application?"
            onConfirm={() =>
              handleDeleteApplication(record.softwareSupportApplicationId)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: "8px" }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Support Application Of Customer</h1>

      <Table
        rowKey={"softwareSupportApplicationId"}
        columns={columns}
        dataSource={applications}
      />
    </div>
  );
}

export default SupportApplicationOfCustomer;
