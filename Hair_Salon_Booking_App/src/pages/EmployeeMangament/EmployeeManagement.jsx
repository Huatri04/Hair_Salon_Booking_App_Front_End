import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(4); // Page size

  const fethEmployee = async (page = 1, size = 4) => {
    try {
      const response = await api.get(`employee?page=${page - 1}&size=${size}`);
      setEmployees(response.data.content);
      setTotal(response.data.totalElements); // Set total items for pagination
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleOpenModal = () => {
    setopenModal(true);
  };

  const handleCloseModal = () => {
    setopenModal(false);
  };
  //crete or update
  const handlecSubmitEmployee = async (values) => {
    // xử lí lấy thông tin thằng employee trong form
    //POST xún API
    //quăng data xún cho thằng BE
    console.log(values);
    try {
      setSubmitting(true); //trước khi gọi api thì load tới khi nào ngừng load
      const response = await api.post("/registerEmployee", values); //lỗi
      // ==> thành công
      toast("Sucessfully create new Employee");
      form.resetFields();
      fethEmployee(currentPage, pageSize);
      setopenModal(false);
      setSubmitting(false);
      //clear dữ liệu cũ
      //lấy lại danh sách mới | hiện nút ok khi sucessfully NE
      // fethEmployee();
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setSubmitting(false);
    }
  };
  //delete
  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`/deleteEmployee/${id}`);
  //     toast.success("Successfully deleted");
  //     // fethEmployee();

  //   } catch (err) {
  //     toast.error(err.response.data);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/deleteEmployee/${id}`);
      if (response.status === 200) {
        // Cập nhật danh sách nhân viên sau khi xóa
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
        toast.success("Successfully deleted");
      }
    } catch (err) {
      toast.error(err.response?.data || "Failed to delete employee");
    }
  };
  // []: dependency array
  //feth data 1 lần khi mà load dữ liệu lên
  useEffect(() => {
    fethEmployee(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <Popconfirm
            title="Delete"
            description="Do you want to delete this employee?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  return (
    <div>
      <h1>Employee Management</h1>
      <Button onClick={handleOpenModal}>Create new Employee</Button>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey={"id"}
        pagination={false}
      />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={4}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new employee"
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form form={form} onFinish={handlecSubmitEmployee}>
          <Form.Item
            label="Username "
            name="username"
            rules={[
              {
                required: true,
                message: "Please input Username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            label="email "
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="phoneNumber "
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input phoneNumber!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password "
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role "
            name="role"
            rules={[
              {
                required: true,
                message: "Please input Role!",
              },
            ]}
          >
            <Select
              defaultValue=""
              style={{ width: 230 }}
              options={[
                {
                  value: "Admin",
                  label: "Admin",
                },
                { value: "Staff", label: "Staff" },
                { value: "Manager", label: "Manager" },
                { value: "Stylist", label: "Stylist" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeManagement;
