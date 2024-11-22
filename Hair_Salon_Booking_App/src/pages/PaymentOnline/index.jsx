import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetParams from "../../hooks/useGetParams";
import api from "../../config/axios";

function PaymentOnline() {
  const navigate = useNavigate();
  const params = useGetParams();
  const orderID = params("orderID");
  const status = params("vnp_TransactionStatus");

  const postTransaction = async (id) => {
    try {
      const response = await api.post(
        `appointment/vnpay/result?appointmentId=${id}`
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  console.log(orderID);
  useEffect(() => {
    if (status === "00") {
      console.log(orderID);
      postTransaction(orderID);
    } else {
      navigate("/staff_page/paymentFail");
    }
  });
  // const status = params("")
  return (
    <div>
      <Result
        status="success"
        title="Thanh toan online thanh cong"
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

export default PaymentOnline;
