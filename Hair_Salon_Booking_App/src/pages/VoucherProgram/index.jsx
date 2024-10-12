import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Table } from "antd";
function VoucherProgram() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "discountProgramId",
      dataIndex: "discountProgramId",
      key: "discountProgramId",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "startedDate",
      dataIndex: "startedDate",
      key: "startedDate",
      render: (text, record) => {
        const date = new Date(record.startedDate);
        return date.toLocaleDateString();
      },
    },
    {
      title: "endedDate",
      dataIndex: "endedDate",
      key: "endedDate",
      render: (text, record) => {
        const date = new Date(record.endedDate);
        return date.toLocaleDateString();
      },
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];
  const fetchData = async () => {
    try {
      const response = await api.get("discountProgram?page=0&size=10");
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
      <Table columns={columns} dataSource={data} rowKey={"discountProgramId"} />
    </div>
  );
}

export default VoucherProgram;
