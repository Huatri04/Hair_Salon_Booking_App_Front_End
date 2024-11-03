import { Table, Button, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function SoftwareSupportOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  const fetchOrder = async () => {
    try {
      const response = await api.get(
        "/softwareSupportApplication/employees?page=0&size=10"
      );
      setOrders(response.data.content);
    } catch (error) {
      toast.error(error.response?.data || "Error fetching orders");
    }
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setUpdatedDescription(order.description);
    setIsModalOpen(true);
  };

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
      try {
        await api.put(
          `/softwareSupportApplication/${selectedOrder.softwareSupportApplicationId}`,
          {
            description: updatedDescription,
          }
        );
        toast.success("Order updated successfully");
        fetchOrder(); // Refresh the order list
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.response?.data || "Error updating order");
      }
    }
  };

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    try {
      await api.delete(`/softwareSupportApplication/${orderId}`);
      toast.success("Order deleted successfully");
      fetchOrder(); // Refresh the order list
    } catch (error) {
      toast.error(error.response?.data || "Error deleting order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "softwareSupportApplicationId",
      key: "softwareSupportApplicationId",
    },
    {
      title: "Tên nhân viên gửi đơn",
      dataIndex: "employee.name",
      key: "employee.name",
      render: (text, record) => record.employee.name,
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
            type="primary" danger
            onClick={() =>
              handleDeleteOrder(record.softwareSupportApplicationId)
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
      <h1>Software Support Order Management</h1>
      <Table
        rowKey={"softwareSupportApplicationId"}
        columns={columns}
        dataSource={orders}
      />

      <Modal
        title="Edit Order"
        open={isModalOpen}
        onOk={handleUpdateOrder}
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

export default SoftwareSupportOrderManagement;
