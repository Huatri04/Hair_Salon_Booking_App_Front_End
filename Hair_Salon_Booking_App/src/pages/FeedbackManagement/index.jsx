import { Table } from "antd";
import React, { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Feedback() {
  const user = useSelector((store) => store.user);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
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
  ];
  const fetchData = async () => {
    try {
      const response = await api.get("feedback", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} key={"feedbackID"} />
    </div>
  );
}

export default Feedback;
