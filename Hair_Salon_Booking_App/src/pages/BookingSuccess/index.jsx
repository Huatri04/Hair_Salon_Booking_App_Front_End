import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookingSuccess() {
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
              navigate("/logged_in");
            }}
          >
            Quay trở về trang Home
          </Button>,
          <Button
            key="buy"
            onClick={() => {
              navigate("/logged_in/booking");
            }}
          >
            Đặt lại lịch hẹn
          </Button>,
        ]}
      />
    </div>
  );
}

export default BookingSuccess;
