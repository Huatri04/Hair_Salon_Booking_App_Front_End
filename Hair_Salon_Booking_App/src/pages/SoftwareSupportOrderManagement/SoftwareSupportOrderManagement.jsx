
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


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
  },[]);

  const columns = [
    {
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
 
return(
    
    <div>
      <h1>Software Support Order Management</h1>
     
       <Table columns={columns} dataSource={oders}/>
      
       </div>  
)
}

export default SoftwareSupportOrderManagement