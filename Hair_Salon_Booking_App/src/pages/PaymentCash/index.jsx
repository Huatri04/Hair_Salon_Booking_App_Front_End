import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentCash() {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="success"
        title="Thanh toan tien mat thanh cong"
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

export default PaymentCash;
