import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function Feedback() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "feedbackId",
      key: "feedbackId",
    },
    {
      title: "Stars",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];
  const fetchData = async () => {
    try {
      const response = await api.get("/feedback?page=0&size=10");
      console.log(response.data);
      setData(response.data.content);
    } catch (err) {
      console.log(err.response.data);
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
