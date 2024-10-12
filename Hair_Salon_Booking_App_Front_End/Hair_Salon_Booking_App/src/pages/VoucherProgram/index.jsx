import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";

function VoucherProgram() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const handleSumbit = (values) => {
    console.log(values);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "discountProgramId",
      key: "discountProgramId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "startedDate",
      dataIndex: "startedDate",
      key: "startedDate",
    },
    {
      title: "endedDate",
      dataIndex: "endedDate",
      key: "endedDate",
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/discountProgram");
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err.response.data);
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
      <Table columns={columns} dataSource={data} rowKey={"discountProgramId"} />
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        onOk={() => form.submit()}
        title="Category"
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSumbit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input.TextArea rows={4} placeholder="Enter your text here" />
          </Form.Item>
          <Form.Item name="startedDate" label="Start Date">
            <DatePicker
              onChange={(date) =>
                form.setFieldsValue({
                  startedDate: date ? date.toISOString() : null,
                })
              }
              format="YYYY-MM-DD"
            />{" "}
          </Form.Item>
          <Form.Item name="endedDate" label="endedDate">
            <DatePicker
              onChange={(date) => {
                // Kiểm tra tính hợp lệ và định dạng ngày
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : null;
                form.setFieldsValue({ endedDate: formattedDate });
              }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item name="amount" label="amount">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="status">
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "notAvailable",
                  label: "Chưa áp dụng",
                },
                {
                  value: "available",
                  label: "Áp dụng",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="percentage" label="Số phần trăm giảm">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default VoucherProgram;
