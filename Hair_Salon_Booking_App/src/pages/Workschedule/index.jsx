
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Workschedule() {

  const [schedules, setSchedules] = useState([]);

  
  const fethSchedule = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    const reponse = await

    console.log(reponse.data);
    setSchedules(reponse.data);

    //GET => Lấy dữ liệu 
  };
  //[]: dependency array
  
  useEffect(() => {
  fethSchedule();
  },[]);

  const columns = [
    {
      title: "Thứ",
      dataIndex: "Thứ",
      key: "Thứ",
    },
    {
      title: "Ca",
      dataIndex: "Ca",
      key: "Ca",
    },
   
    
  ];
 
return(
    // 
    <div>
      <h1>Work Schedule</h1>
     
       <Table columns={columns} dataSource={schedules}/>
      
       </div>  
)
}

export default Workschedule