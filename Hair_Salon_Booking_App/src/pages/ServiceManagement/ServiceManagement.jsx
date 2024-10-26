<<<<<<< Updated upstream
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
=======
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import TextArea from 'antd/es/input/TextArea';

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
      toast.success('Service deleted successfully!');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service.');
    }
  };

  const handleSubmitService = async (values) => {
    console.log("Values being sent:", values); // Kiểm tra giá trị
  
    try {
      setSubmitting(true);
      if (editingService) {
        // Update service
        await api.put(`/service/${editingService.id}`, values);
        toast.success('Service updated successfully!');
      } else {
        // Create new service
        await api.post("/service", values);
        toast.success('Service created successfully!');
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error("Error during API call:", errorMessage);
      toast.error('Failed to save service. ' + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
   
=======
>>>>>>> Stashed changes
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
<<<<<<< Updated upstream
    
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
=======
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
            rules={[{ required: true, message: "Please input Time of Service!" }]}
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
>>>>>>> Stashed changes
