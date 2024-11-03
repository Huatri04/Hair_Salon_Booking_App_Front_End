import { Table, Button, Modal, Input } from "antd";
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

  const openEditModal = (application) => {
    setSelectedApplication(application);
    setUpdatedDescription(application.description);
    setIsModalOpen(true);
  };

  const handleUpdateApplication = async () => {
    if (selectedApplication) {
      try {
        await api.put(
          `/softwareSupportApplication/${selectedApplication.softwareSupportApplicationId}`,
          {
            description: updatedDescription,
          }
        );
        toast.success("Application updated successfully");
        fetchApplication(); // Refresh the application list
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.response?.data || "Error updating application");
      }
    }
  };

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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              handleDeleteApplication(record.softwareSupportApplicationId)
            }
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
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

      <Modal
        title="Edit Application"
        open={isModalOpen}
        onOk={handleUpdateApplication}
        onCancel={() => setIsModalOpen(false)}
      >
        <label>Description:</label>
        <Input
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default SupportApplicationOfCustomer;
