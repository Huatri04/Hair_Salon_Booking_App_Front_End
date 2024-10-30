import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function SupportApplicationOfCustomer() {
  const [applications, setApplications] = useState([]);

  const fethApplication = async () => {
    try {
      const response = await api.get(
        "/softwareSupportApplication/customers?page=0&size=10"
      );
      setApplications(response.data.content);
    } catch (error) {
      toast.error(error.response.data);
    }

    //GET => Lấy dữ liệu
  };
  //[]: dependency array
  useEffect(() => {
    fethApplication();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "softwareSupportApplicationId",
      key: "softwareSupportApplicationId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer.name",
      key: "customer.name",
      render: (text, record) => record.customer.name,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const date = new Date(record.createdAt);
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <div>
      <h1>Support Application Of Customer</h1>

      <Table
        rowKey={"softwareSupportApplicationId"}
        columns={columns}
        dataSource={applications}
      />
    </div>
  );
}

export default SupportApplicationOfCustomer;
