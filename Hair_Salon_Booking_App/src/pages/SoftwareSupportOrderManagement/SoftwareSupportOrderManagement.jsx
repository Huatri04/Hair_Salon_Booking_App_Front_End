
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
<<<<<<< Updated upstream


function SoftwareSupportOrderManagement() {

  const [oders, setOders] = useState([]);

  const api = "http://localhost:8080/api/softwareSupportApplication";
  const fethOder = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setOders(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethOder();
=======
import api from '../../config/axios';
import { toast } from 'react-toastify';

function SoftwareSupportOrderManagement() {

  const [oders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await api.get("/softwareSupportApplication/employees?page=0&size=10");
      setOrders(response.data.content);
    } catch (error) {
      toast.error(error.response.data)
    }
  };
  //[]: dependency array
  useEffect(() => {
  fetchOrder();
>>>>>>> Stashed changes
  },[]);

  const columns = [
    {
<<<<<<< Updated upstream
      title: "Tên nhân viên gửi đơn",
      dataIndex: "Tên nhân viên gửi đơn",
      key: "Tên nhân viên gửi đơn",
    },
    {
      title: "Mô tả",
      dataIndex: "Mô tả",
      key: "Mô tả",
    },
    {
        title: "Tên khách hàng gửi đơn",
        dataIndex: "Tên khách hàng gửi đơn",
        key: "Tên khách hàng gửi đơn",
      },
    
  ];
 
=======
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
    }
    
  ];
  

>>>>>>> Stashed changes
return(
    
    <div>
      <h1>Software Support Order Management</h1>
     
<<<<<<< Updated upstream
       <Table columns={columns} dataSource={oders}/>
=======
       <Table key={"softwareSupportApplicationId"} columns={columns} dataSource={oders}/>
>>>>>>> Stashed changes
      
       </div>  
)
}

export default SoftwareSupportOrderManagement