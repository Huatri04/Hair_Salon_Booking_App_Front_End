<<<<<<< Updated upstream
import { Button, Form, Input, InputNumber, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function EmployeeManagement() {

  const [employees, setEmployees] = useState([]);
  const[openModal, setopenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form]= useForm();
  const api = "https://66f55c659aa4891f2a24f185.mockapi.io/Employee";
  const fethEmployee = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setEmployees(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethEmployee();
  },[]);
=======
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
>>>>>>> Stashed changes

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
<<<<<<< Updated upstream
=======
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
>>>>>>> Stashed changes
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
<<<<<<< Updated upstream
   
=======
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
>>>>>>> Stashed changes
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
<<<<<<< Updated upstream
    
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ];
  const handleOpenModal = () =>{
    setopenModal(true);
  }

  const handleCloseModal = () =>{
    setopenModal(false);

  }
  const handlecSubmitEmployee =  async (employee) => {
    // xử lí lấy thông tin thằng employee trong form
    //POST xún API
    console.log(employee)
    //quăng data xún cho thằng BE
    try{
    setSubmitting(true);//trước khi gọi api thì load tới khi nào ngừng load
    const response = axios.post(api, employee)//lỗi 
    // ==> thành công
    toast('Sucessfully create new Employee')
    setopenModal(false);
    setSubmitting(false);
    //clear dữ liệu cũ 
    form.resetFields();

    //lấy lại danh sách mới | hiện nút ok khi sucessfully NE 
    fethEmployee();
    }catch(err){
      
      toast.error(err);
    }finally{
      setSubmitting(false);
    }
  }
  return (
    
    <div>
      <h1>Employee Management</h1>
      <Button onClick={handleOpenModal}>Create new Employee</Button>
       <Table columns={columns} dataSource={employees}/>
       <Modal confirmLoading={submitting} onOk={() => form.submit()} title="Create new employee"open = {openModal} onCancel={handleCloseModal}>
       <Form onFinish={handlecSubmitEmployee}form={form}>
        <Form.Item label = "Username " name="username" rules={[
          {
            required: true,
            message: "Please input Username!",
          }
        ]}>
          <Input/>
        </Form.Item>

        <Form.Item label = "Name " name="name" rules={[
          {
            required: true,
            message: "Please input Name!",
          }
        ]}>
          <Input/>
        </Form.Item>
        {/* <Form.Item label = "ID" name = "id" rules={[
          {
            required: true,
            message: "Please input ID!",
          },
          {
            pattern: '^[0-9]{6}$',
            message: "Invalid format!",
          }

        ]}>

          <Input/>
        </Form.Item> */}

        {/* <Form.Item label = "Basic Salary" name = "basic_salary" rules={[
          {
            required: true,
            message: "Please input Basic Salary!",
          },
          {
            type: "number",
            min: 0,
            max: 10,
            message: "Invailid Basic Salary"
          }

        ]}>

          <InputNumber step={0.5}/>
        </Form.Item> */}
         <Form.Item label = "Password " name="password" rules={[
          {
            required: true,
            message: "Please input Password!",
          }
        ]}>
          <Input.Password/>
        </Form.Item>

        <Form.Item label = "Role " name="role" rules={[
          {
            required: true,
            message: "Please input Role!",
          }
        ]}>
          <Input/>
        </Form.Item>

        {/* <Form.Item label = "Experience " name="experience" rules={[
          {
            required: true,
            message: "Please input Username!",
          }
        ]}>
          <Input/>
        </Form.Item> */}

       

        

       </Form>
       </Modal>
    </div>
   
  );
}

export default EmployeeManagement
=======
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
>>>>>>> Stashed changes
