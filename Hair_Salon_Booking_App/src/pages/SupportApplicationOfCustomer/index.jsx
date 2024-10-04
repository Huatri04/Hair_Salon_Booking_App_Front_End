
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function SupportApplicationOfCustomer() {
  const [applications, setApplications ] = useState([]);
 
  const api = "https://66f55c659aa4891f2a24f185.mockapi.io/Employee";
  const fethApplication = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setApplications(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethApplication();
  },[]);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "Tên khách hàng",
      key: "Tên khách hàng",
    },
    {
      title: "Trạng thái",
      dataIndex: "Trạng thái",
      key: "Trạng thái",
    },
    
    
  ];
 
return(
    
    <div>
      <h1>Support Application Of Customer</h1>
     
       <Table columns={columns} dataSource={applications}/>
      
       </div>  
)
}

export default SupportApplicationOfCustomer