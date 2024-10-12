import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, Form, InputNumber, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";

function TransactionManagement() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const columns = [
    {
      title: "transactionId",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "transactionType",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "money",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render: (text, record) => {
        const date = new Date(record.date);
        return date.toLocaleDateString();
      },
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const fetchData = async () => {
    try {
      const response = await api.get("transaction?page=0&size=10");
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
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add
      </Button>
      <Modal open={showModal} onCancel={() => setShowModal(false)}>
        <Form>
          <Form.Item>
            <Select
              placeholder="Select a transaction type"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="expenses">Expenses</Option>
              <Option value="revenue">Revenue</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <InputNumber min={1000} />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} rowKey={"transactionId"} />
    </div>
  );
}

export default TransactionManagement;
