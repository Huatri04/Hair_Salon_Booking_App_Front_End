import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { toast } from "react-toastify";
import api from "../../config/axios";

const WeeklyTimetable = () => {
  const [shiftData, setShiftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null); // startDate cho tuần hiện tại
  const [weekDates, setWeekDates] = useState([]); // Các ngày từ thứ Hai đến Chủ Nhật

  // Hàm xác định ngày đầu tuần (thứ Hai) dựa vào ngày hiện tại
  const calculateWeekDates = (baseDate = new Date()) => {
    const dayOfWeek = baseDate.getDay();
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // Format yyyy-mm-dd
    }
    setStartDate(dates[0]); // Ngày đầu tuần (thứ Hai)
    setWeekDates(dates);
  };

  useEffect(() => {
    // Tính toán các ngày của tuần hiện tại khi component mount
    calculateWeekDates();
  }, []);

  useEffect(() => {
    if (!startDate) return;

    const fetchShiftData = async () => {
      setLoading(true);
      try {
        console.log("Fetching shifts for startDate:", startDate); // Kiểm tra giá trị startDate
        const response = await api.get(
          `/shiftEmployee/stylist/${startDate}?page=1&pageSize=10`
        );
        const data = response.data.content.map((shift) => ({
          id: shift.id,
          name: shift.name,
          date: shift.date,
          dayInWeek: shift.dayInWeek,
          startHour: shift.startHour,
          endHour: shift.endHour,
        }));
        setShiftData(data);
      } catch (error) {
        console.error("Error fetching shift data:", error.response || error); // Thông báo chi tiết lỗi
        toast.error("Có lỗi xảy ra khi tải dữ liệu ca làm việc!");
      } finally {
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [startDate]);

  // Hàm chuyển đến tuần tiếp theo
  const goToNextWeek = () => {
    const nextMonday = new Date(startDate);
    nextMonday.setDate(nextMonday.getDate() + 7);
    calculateWeekDates(nextMonday);
  };

  // Hàm chuyển đến tuần trước
  const goToPreviousWeek = () => {
    const previousMonday = new Date(startDate);
    previousMonday.setDate(previousMonday.getDate() - 7);
    calculateWeekDates(previousMonday);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày trong tuần",
      dataIndex: "dayInWeek",
      key: "dayInWeek",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startHour",
      key: "startHour",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endHour",
      key: "endHour",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <h2>
        Lịch làm việc từ {weekDates[0]} đến {weekDates[6]}
      </h2>
      <div>
        <Button onClick={goToPreviousWeek}>Trước</Button>
        <Button onClick={goToNextWeek}>Sau</Button>
      </div>
      <Table
        columns={columns}
        dataSource={shiftData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default WeeklyTimetable;
