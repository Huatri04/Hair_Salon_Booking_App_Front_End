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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
   
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    
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