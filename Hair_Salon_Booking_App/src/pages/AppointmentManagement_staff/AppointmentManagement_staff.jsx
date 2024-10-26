
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function AppointmentManagement_staff() {
  const [appointments, setAppointments] = useState([]);

  
  const fethAppointment = async () =>{
    // lấy dữ liệu từ bach-end
    
    //javascrip gọi đây là promise 
    //chưa xảy ra liền cần 1 thời gian thực hiện 
    //=> function bất đồng bộ => cần thời gian để thực hiện 
    // await: đợi tới khi mà api trả về kết quả 
    try {
        // Cập nhật URL API của bạn
        const response = await axios.get();
        setAppointments(response.data);  // Cập nhật dữ liệu lịch hẹn vào state
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };
  //[]: dependency array
  useEffect(() => {
  fethAppointment();
  },[]);

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',  // Dữ liệu từ API
      key: 'customerName',
    },
    {
      title: 'Ngày hẹn',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (text) => new Date(text).toLocaleDateString(),  // Định dạng lại ngày
    },
    {
      title: 'Giờ hẹn',
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
      render: (text) => new Date(text).toLocaleTimeString(),  // Định dạng lại giờ
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Nhân viên',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];
 
return(
    
    <div>
      <h1>Appointment Management</h1>
     
       <Table columns={columns} dataSource={appointments} rowKey="id"/> 
       

      
       </div>  
)
}

export default AppointmentManagement_staff;