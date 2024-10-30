import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import TextArea from "antd/es/input/TextArea";

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = useForm();

  const fetchServices = async () => {
    try {
      const response = await api.get("/service?page=0&size=8");
      const fetchedServices = response.data.content || []; // Cung cấp mảng rỗng nếu không có dữ liệu
      console.log("Fetched services:", fetchedServices);
      setServices(fetchedServices);
    } catch (error) {
      toast.error("Failed to fetch services.");
    }
  };

  const handleOpenModal = () => {
    setEditingService(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const handleEditService = (service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setOpenModal(true);
  };

  const handleDeleteService = async (id) => {
    try {
      await api.delete(`/service/${id}`);
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service.");
    }
  };

  const handleSubmitService = async (values) => {
    console.log("Values being sent:", values); // Kiểm tra giá trị

    try {
      setSubmitting(true);
      if (editingService) {
        // Update service
        await api.put(`/service/${editingService.id}`, values);
        toast.success("Service updated successfully!");
      } else {
        // Create new service
        await api.post("/service", values);
        toast.success("Service created successfully!");
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error during API call:", errorMessage);
      toast.error("Failed to save service. " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
      title: "Time of Service",
      dataIndex: "timeOfService",
      key: "timeOfService",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "id",
      render: (id, service) => (
        <>
          <Button type="primary" onClick={() => handleEditService(service)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this employee?"
            onConfirm={() => handleDeleteService(service.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Service Management</h1>
      <Button onClick={handleOpenModal}>Create new Service</Button>
      <Table columns={columns} dataSource={services} rowKey="id" />
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title={editingService ? "Edit Service" : "Create New Service"}
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmitService} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: "Please input Cost!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time of Service"
            name="timeOfService"
            rules={[
              { required: true, message: "Please input Time of Service!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please input Image!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Enter your text here" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ServiceManagement;
