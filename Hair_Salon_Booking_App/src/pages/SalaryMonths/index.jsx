import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function SalaryMonths() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(4); // Page size

  const fetchData = async () => {
    try {
      const response = await api.get(
        `salaryMonth?page=${currentPage - 1}&size=${pageSize}`
      );
      setData(response.data.content);
      setTotal(response.data.totalElement);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "salaryMonthId",
      dataIndex: "salaryMonthId",
      key: "salaryMonthId",
    },
    {
      title: "month",
      dataIndex: "month",
      key: "month",
    },

    {
      title: "sumSalary",
      dataIndex: "sumSalary",
      key: "sumSalary",
    },
    {
      title: "Employee Name",
      dataIndex: "Employee.name",
      key: "Employee.name",
      render: (text, record) => record.employee.name,
    },
    {
      title: "Employee Role",
      dataIndex: "Employee.role",
      key: "Employee.role",
      render: (text, record) => record.employee.role,
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={4}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
    </div>
  );
}

export default SalaryMonths;
