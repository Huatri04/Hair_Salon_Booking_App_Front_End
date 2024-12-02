import { Button, Pagination, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ManageCustomer() {
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
        `customer?page=${currentPage - 1}&size=${pageSize}`
      );
      setTotal(response.data.totalElements);
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleDelete = async (customerId) => {
    try {
      await api.delete(`banAccountCustomer/${customerId}`);
      toast.success("Customer deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete customer");
    }
  };
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  const columns = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "customerName",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this customer?"
          onConfirm={() => handleDelete(record.phoneNumber)}
          okText="Yes"
          cancelText="No"
        >
          {" "}
          <Button type="primary" danger>
            Delete
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

export default ManageCustomer;
