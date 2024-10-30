import { Table, Button, Form, Input, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function Listhistorysoftwaresupportapplication_staff() {
  const [lists, setLists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [form] = Form.useForm();

  const fetchList = async () => {
    try {
      const response = await api.get(
        "/softwareSupportApplication/employees?page=0&size=10"
      );
      console.log(response.data);
      setLists(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleAdd = async (values) => {
    try {
      await api.post("/softwareSupportApplication", values);
      fetchList(); // Cập nhật lại danh sách sau khi thêm mới
      setOpenModal(false); // Đóng modal
      form.resetFields(); // Reset form
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEdit = async (values) => {
    try {
      await api.put(`/softwareSupportApplication/${currentEditId}`, values);
      fetchList(); // Cập nhật lại danh sách sau khi chỉnh sửa
      setOpenModal(false); // Đóng modal
      form.resetFields(); // Reset form
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields(); // Reset form fields khi đóng modal
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/softwareSupportApplication/${id}`);
      fetchList(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenEditModal = (employee) => {
    form.setFieldsValue({
      description: employee.description,
      img: employee.img,
    });
    setCurrentEditId(employee.softwareSupportApplicationId); // Lưu ID để sử dụng khi cập nhật
    setIsEditing(true); // Đánh dấu là đang chỉnh sửa
    setOpenModal(true); // Mở modal
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "softwareSupportApplicationId",
      key: "softwareSupportApplicationId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img
          src={img}
          alt="Hình ảnh"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      key: "softwareSupportApplicationId",
      render: (softwareSupportApplicationId, employee) => (
        <>
          <Button onClick={() => handleOpenEditModal(employee)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this application?"
            onConfirm={() =>
              handleDelete(employee.softwareSupportApplicationId)
            }
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
      <h1>List History Software Support Application</h1>
      <Button onClick={() => setOpenModal(true)}>
        Add New Software Support
      </Button>
      <Table
        columns={columns}
        dataSource={lists}
        rowKey="softwareSupportApplicationId"
      />

      <Modal
        title={isEditing ? "Edit Software Support" : "Add New Software Support"}
        open={openModal}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {isEditing ? "Update" : "OK"}
          </Button>,
        ]}
      >
        <Form form={form} onFinish={isEditing ? handleEdit : handleAdd}>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            label="Hình ảnh URL"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập URL hình ảnh!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Listhistorysoftwaresupportapplication_staff;
