import { Button, Form, Input, InputNumber, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function ServiceManagement () {

  const [services, setServices] = useState([]);
  const[openModal, setopenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form]= useForm();
  const api = "https://66f55c659aa4891f2a24f185.mockapi.io/Employee";
  const fethService = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setServices(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethService();
  },[]);

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
      title: "Timeofservice",
      dataIndex: "timeofservice",
      key: "timeofservice",
    },
  ];
  const handleOpenModal = () =>{
    setopenModal(true);
  }

  const handleCloseModal = () =>{
    setopenModal(false);

  }
  const handlecSubmitService =  async (service) => {
    // xử lí lấy thông tin thằng employee trong form
    //POST xún API
    console.log(service)
    //quăng data xún cho thằng BE
    try{
    setSubmitting(true);//trước khi gọi api thì load tới khi nào ngừng load
    const response = axios.post(api, service)//lỗi 
    // ==> thành công
    toast('Sucessfully create new Service')
    setopenModal(false);
    setSubmitting(false);
    //clear dữ liệu cũ 
    form.resetFields();

    //lấy lại danh sách mới | hiện nút ok khi sucessfully NE 
    fethService();
    }catch(err){
      
      toast.error(err);
    }finally{
      setSubmitting(false);
    }
  }
  return (
    
    <div>
      <h1>Service Management</h1>
      <Button onClick={handleOpenModal}>Create new Service</Button>
       <Table columns={columns} dataSource={services}/>
       <Modal confirmLoading={submitting} onOk={() => form.submit()} title="Create new service"open = {openModal} onCancel={handleCloseModal}>
       <Form onFinish={handlecSubmitService}form={form}>
        

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
         <Form.Item label = "cost " name="cost" rules={[
          {
            required: true,
            message: "Please input cost!",
          }
        ]}>
          <Input/>
        </Form.Item>

        <Form.Item label = "timeofservice " name="timeofservice" rules={[
          {
            required: true,
            message: "Please input timeofservice!",
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

export default ServiceManagement;