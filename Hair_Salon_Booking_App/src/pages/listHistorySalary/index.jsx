import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import "./index.css";
function Listhistorysalary_staff() {
  const [salarys, setSalarys] = useState([]);
  const user = useSelector((store) => store.user);
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Page size

  const fetchSalary = async () => {
    try {
      // Gọi API để lấy dữ liệu
      const response = await api.get(
        `salaryMonth/employee?page=${currentPage - 1}&size=${pageSize}`
      );
      console.log(response.data);
      setTotal(response.data.totalElement);
      setSalarys(response.data.content);
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
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  return (
    <div>
      <h1>List history salary</h1>

      <Table
        rowKey={"salaryMonthId"}
        columns={columns}
        dataSource={salarys}
        pagination={false}
      />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={8}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
    </div>
  );
}

export default Listhistorysalary_staff;
