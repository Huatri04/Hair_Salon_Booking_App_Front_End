
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Listhistorysoftwaresupportapplication() {

  const [lists, setLists] = useState([]);

  const api = "http://localhost:8080/api/softwareSupportApplication";
  const fethList = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await axios.get(api);

    console.log(reponse.data);
    setLists(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  useEffect(() => {
  fethList();
  },[]);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Mô tả",
      dataIndex: "Mô tả",
      key: "Mô tả",
    },
   
    
  ];
 
return(
    
    <div>
      <h1>List history software support application</h1>
     
       <Table columns={columns} dataSource={lists}/>
      
       </div>  
)
}

export default Listhistorysoftwaresupportapplication