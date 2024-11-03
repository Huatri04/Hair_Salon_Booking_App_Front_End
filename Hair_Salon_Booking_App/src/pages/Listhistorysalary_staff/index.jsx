import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function Listhistorysalary_staff() {
  const [salarys, setSalarys] = useState([]);

  const fetchSalary = async () => {
    try {
      // Gọi API để lấy dữ liệu
      const response = await api.get("/salaryMonth?page=0&size=10");
      console.log(response.data);
      setSalarys(response.data.content); // Giả sử dữ liệu trả về trong key `content`
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  //[]: dependency array
  useEffect(() => {
    fetchSalary();
  }, []);

  const columns = [
    {
      title: "SalaryMonthId",
      dataIndex: "salaryMonthId",
      key: "salaryMonthId",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "SumSalary",
      dataIndex: "sumSalary",
      key: "sumSalary",
    },
  ];

  return (
    <div>
      <h1>List history salary</h1>

      <Table rowKey={"salaryMonthId"} columns={columns} dataSource={salarys} />
    </div>
  );
}

export default Listhistorysalary_staff;
