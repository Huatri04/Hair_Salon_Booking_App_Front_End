
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
<<<<<<< Updated upstream
=======
import api from '../../config/axios';
>>>>>>> Stashed changes


function CustomerAccountManagememnt() {
  const [accounts, setAccounts ] = useState([]);
 
<<<<<<< Updated upstream
  const api = "https://66f55c659aa4891f2a24f185.mockapi.io/Employee";
  const fethAccount = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setAccounts(reponse.data);

    //GET => Lấy dữ liệu 
=======
  
  const fethAccount = async () => {
    try {
      const response = await api.get("/ProfileCustomer/0896986223");
      console.log(response.data);
  
      // Đảm bảo dữ liệu luôn là mảng
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
>>>>>>> Stashed changes
  };
  //[]: dependency array
  useEffect(() => {
  fethAccount();
  },[]);

  const columns = [
    {
<<<<<<< Updated upstream
      title: "Tên khách hàng",
      dataIndex: "Tên khách hàng",
      key: "Tên khách hàng",
    },
    {
      title: "Trạng thái",
      dataIndex: "Trạng thái",
      key: "Trạng thái",
    },
    
    
=======
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CustomerName",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text) => (
        <span>{text}</span> // Add visibility toggle logic here if needed
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "creatAt",
      key: "creatAt",
      render: (text, record) => {
        const date = new Date(record.creatAt);
        return date.toLocaleDateString();
    },
    }
>>>>>>> Stashed changes
  ];
 
return(
    
    <div>
      <h1>Customer Account Managememnt</h1>
     
       <Table columns={columns} dataSource={accounts}/>
      
       </div>  
)
}

export default CustomerAccountManagememnt