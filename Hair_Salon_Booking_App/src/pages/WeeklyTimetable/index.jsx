import api from "../../config/axios";
import { Table, Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function WeeklyTimetable() {
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Ngày hiện tại
  );
  const [inputDate, setInputDate] = useState(selectedDate); // Ngày từ ô nhập

  // Hàm để lấy thông tin ca làm việc từ API
  const fetchShifts = async () => {
    try {
      const response = await api.get(`/shiftEmployee`);
      setShifts(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin ca làm việc");
    }
  };

  // Sử dụng useEffect để lấy dữ liệu khi component được render
  useEffect(() => {
    fetchShifts();
  }, []);

  // Cấu trúc các cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "slotId",
      key: "slotId",
    },
    {
      title: "Tên Stylist",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "Giờ Bắt Đầu",
      dataIndex: "startHour",
      key: "startHour",
    },
    {
      title: "Cấp bậc Stylist",
      dataIndex: "stylistLevel",
      key: "stylistLevel",
      render: (level) => (level ? level : "Không có thông tin"),
    },
  ];

  // Hàm để chọn ngày và lấy dữ liệu ca làm việc theo ngày
  const handleSelectDay = async (date) => {
    setSelectedDate(date);
    setInputDate(date); // Cập nhật ô nhập
    try {
      const response = await api.get(`/shiftEmployee/available/${date}`);
      setShifts(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu ca làm việc theo ngày");
    }
  };

  // Hàm để xử lý khi ô nhập liệu thay đổi
  const handleInputChange = (e) => {
    setInputDate(e.target.value);
  };

  // Hàm để xử lý khi người dùng nhấn nút xem ca làm việc
  const handleSubmit = () => {
    handleSelectDay(inputDate);
  };

  return (
    <div>
      <h1>Thông Tin Ca Làm Việc Của Nhân Viên</h1>

      <div style={{ marginBottom: "16px" }}>
        <Input
          type="date"
          value={inputDate}
          onChange={handleInputChange}
          style={{ marginRight: "8px" }}
        />
        <Button onClick={handleSubmit}>Xem ca làm việc</Button>
      </div>
      <Table rowKey={"slotId"} columns={columns} dataSource={shifts} />
    </div>
  );
}

export default WeeklyTimetable;
