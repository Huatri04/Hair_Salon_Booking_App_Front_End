import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);

  const fethAppointment = async () => {
    try {
      const response = await axios.get();
      setAppointments(response.data); // Cập nhật dữ liệu lịch hẹn vào state
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };
  //[]: dependency array
  useEffect(() => {
    fethAppointment();
  }, []);

  const columns = [
    {
      title: "Tên Nhân Viên",
      dataIndex: "employee.name", // Dữ liệu từ API
      key: "employee.name",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (text) => new Date(text).toLocaleDateString(), // Định dạng lại ngày
    },
    {
      title: "Giờ hẹn",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (text) => new Date(text).toLocaleTimeString(), // Định dạng lại giờ
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Khách hàng",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <h1>Appointment Management</h1>

      <Table columns={columns} dataSource={appointments} rowKey="id" />
    </div>
  );
}

export default AppointmentManagement;
