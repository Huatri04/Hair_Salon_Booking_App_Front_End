
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null); // Thêm trạng thái để theo dõi nhân viên đang chỉnh sửa

  const fetchEmployee = async () => {
    try {
      const response = await api.get("/employee?page=0&size=8");
      const uniqueEmployees = response.data.content.filter((employee, index, self) =>
        index === self.findIndex((e) => e.id === employee.id)
      );
      setEmployees(uniqueEmployees);
    } catch (err) {
      toast.error(err.response?.data || "Error fetching employees");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields(); // Reset form fields khi đóng modal
    setEditingEmployee(null); // Reset employee đang chỉnh sửa
  };

  const handlecSubmitEmployee = async (values) => {
    try {
      setSubmitting(true);
      if (editingEmployee) {
        // Nếu đang chỉnh sửa, gọi API cập nhật
        const response = await api.put(`/updateEmployee/${editingEmployee.id}`, values); // Đổi URL cho phù hợp
        toast('Successfully updated employee');
      } else {
        // Nếu không, gọi API tạo mới
        const response = await api.post("/registerEmployee", values);
        toast('Successfully created new employee');
      }
      setOpenModal(false);
      fetchEmployee(); // Lấy lại danh sách nhân viên
    } catch (err) {
      toast.error(err.response?.data || "Error submitting employee data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee); // Lưu thông tin nhân viên đang chỉnh sửa
    form.setFieldsValue(employee); // Điền thông tin vào form
    setOpenModal(true); // Mở modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/deleteEmployee/${id}`);
      if (response.status === 200) {
        setEmployees((prevEmployees) => 
          prevEmployees.filter((employee) => employee.id !== id)
        );
        toast.success("Successfully deleted");
      }
    } catch (err) {
      toast.error(err.response?.data || "Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployee();
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Image",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, employee) => {
        return (
          <>
            <Button type="primary" onClick={() => handleEdit(employee)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this employee?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Employee Management</h1>
      <Button onClick={handleOpenModal}>Create new Employee</Button>
      <Table columns={columns} dataSource={employees} rowKey={"id"} />
      <Modal 
        confirmLoading={submitting} 
        onOk={() => form.submit()} 
        title={editingEmployee ? "Edit Employee" : "Create New Employee"}
        open={openModal} 
        onCancel={handleCloseModal}
      >
        <Form onFinish={handlecSubmitEmployee} form={form}>
          <Form.Item 
          label="Username" 
          name="username" 
          rules={[{ required: true, message: "Please input Username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
          label="Name" 
          name="name" 
          rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
          label="Email" 
          name="email" 
          rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
          label="Phone Number" 
          name="phoneNumber" 
          rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
          label="Image" 
          name="img" 
          rules={[{ required: true, message: "Please input image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
          label="Password" 
          name="password" 
          rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item 
          label="Role" 
          name="role" 
          rules={[{ required: true, message: "Please input Role!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeManagement;
