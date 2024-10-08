
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Listhistorysalary() {

  const [salarys, setSalarys] = useState([]);

  const api = "http://localhost:8080/api/softwareSupportApplication";
  const fethSalary = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setSalarys(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethSalary();
  },[]);

  const columns = [
    {
      title: "Hoa hồng",
      dataIndex: "Hoa hồng",
      key: "Hoa hồng",
    },
    {
      title: "Tiền phạt",
      dataIndex: "Tiền phạt",
      key: "Tiền phạt",
    },
    {
        title: "Tháng",
        dataIndex: "Tháng",
        key: "Tháng",
      },
      {
        title: "Tổng lương",
        dataIndex: "Tổng lương",
        key: "Tổng lương",
      },
    
  ];
 
return(
    
    <div>
      <h1>List history salary</h1>
     
       <Table columns={columns} dataSource={salarys}/>
      
       </div>  
)
}

export default Listhistorysalary