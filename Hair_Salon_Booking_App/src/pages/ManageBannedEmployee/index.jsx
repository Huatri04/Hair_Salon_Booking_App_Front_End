import { Button, Pagination, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ManagerBannedEmployee() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Page size

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);
  const fetchData = async () => {
    try {
      const response = await api.get(
        `employee/deleted?page=${currentPage - 1}&size=${pageSize}`
      );
      setTotal(response.data.totalElements);
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handlRestart = async (id) => {
    try {
      await api.put(`employee/restart/${id}`);
      toast.success("Employee restarted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to restart Employee");
    }
  };
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to restart this employee?"
          onConfirm={() => handlRestart(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Restart
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      ManageCustomer
      <Table columns={columns} dataSource={data} pagination={false} />
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

export default ManagerBannedEmployee;
