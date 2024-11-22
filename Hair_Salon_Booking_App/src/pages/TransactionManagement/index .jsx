import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Table } from "antd";
import { Option } from "antd/es/mentions";

function TransactionManagement() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "transactionId",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "transactionType",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "money",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render: (text, record) => {
        const date = new Date(record.date);
        return date.toLocaleDateString();
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get("transaction?page=0&size=10");
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey={"transactionId"} />
    </div>
  );
}

export default TransactionManagement;
