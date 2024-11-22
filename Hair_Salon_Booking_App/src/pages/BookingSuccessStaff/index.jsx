import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookingSuccessStaff() {
  const [booked, setBooked] = useState([]);
  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("booking")); // Parse the JSON string to an object
    if (bookingData) {
      setBooked(bookingData); // Set the bookingData object
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="success"
        title="Đặt lịch hẹn thành công"
        subTitle={`ID đặt lịch hẹn: ${booked.id}, Tổng số tiền cần thanh toán: ${booked.cost}`}
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              navigate("/staff_page/appointmentManagement");
            }}
          >
            Quay trở về trang Quan ly lich hen
          </Button>,
        ]}
      />
    </div>
  );
}

export default BookingSuccessStaff;
