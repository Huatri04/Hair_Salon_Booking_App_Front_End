import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Feedback() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "feedbackId",
      dataIndex: "feedbackId",
      key: "feedbackId",
    },
    {
      title: "Start",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Customer Name",
      dataIndex: "customer.name",
      key: "customer.name",
      render: (text, record) => record.customer.name,
    },
    {
      title: "Time Create",
      dataIndex: "customer.creatAt",
      key: "customer.creatAt",
      render: (text, record) => {
        const date = new Date(record.customer.creatAt);
        return date.toLocaleDateString();
      },
    },
  ];
  const fetchData = async () => {
    try {
      const response = await api.get("feedback?page=0&size=10");
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
      <Table columns={columns} dataSource={data} rowKey={"feedbackId"} />
    </div>
  );
}

export default Feedback;
