
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

  },[]);

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
    }
  ];
return(
    <div>
      <h1>Software Support Order Management</h1>
       <Table key={"softwareSupportApplicationId"} columns={columns} dataSource={oders}/>
       </div>  
)
}
export default SoftwareSupportOrderManagement