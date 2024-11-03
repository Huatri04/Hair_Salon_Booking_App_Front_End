import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function CustomerAccountManagememnt() {
  const [accounts, setAccounts] = useState([]);
  //const [passwordVisible, setPasswordVisible] = useState(false);
  const fethAccount = async () => {
    try {
      const response = await api.get("/customer?page=0&size=2");
      console.log(response.data);

      // Đảm bảo dữ liệu luôn là mảng
      const data = Array.isArray(response.data.content)
        ? response.data.content
        : [];
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };
  //[]: dependency array
  useEffect(() => {
    fethAccount();
  }, []);
  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };
  const columns = [
    {
      title: "CustomerName",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo",
      dataIndex: "creatAt",
      key: "creatAt",
      render: (text, record) => {
        const date = new Date(record.creatAt);
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <div>
      <h1>Customer Managememnt</h1>
      <Table rowKey={"phoneNumber"} columns={columns} dataSource={accounts} />
    </div>
  );
}

export default CustomerAccountManagememnt;
