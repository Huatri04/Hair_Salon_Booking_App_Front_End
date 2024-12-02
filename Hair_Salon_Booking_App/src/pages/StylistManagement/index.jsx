import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { render } from "@testing-library/react";

function StylistManagement() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const fetchData = async () => {
    try {
      const response = await api.get("stylist?page=0&size=10");
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleEditStylist = (stylist) => {
    setShowModal(true);
    form.setFieldsValue(stylist);
  };
  const handleOk = () => {
    form.submit();
  };

  const handleFinish = async (values) => {
    const { id, targetKPI, stylistLevel, stylistSelectionFee } = values;
    try {
      const valuesSend = { targetKPI, stylistLevel, stylistSelectionFee };
      const response = await api.put(
        `profileEmployeeEditByManager/${id}`,
        valuesSend
      );
      toast.success("Update thanh cong");
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }

    setShowModal(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "stylistLevel",
      dataIndex: "stylistLevel",
      key: "stylistLevel",
    },
    {
      title: "stylistSelectionFee",
      dataIndex: "stylistSelectionFee",
      key: "stylistSelectionFee",
    },
    {
      title: "targetKPI",
      dataIndex: "targetKPI",
      key: "targetKPI",
    },
    {
      title: "kpi",
      dataIndex: "kpi",
      key: "kpi",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, stylist) => (
        <>
          <Button type="primary" onClick={() => handleEditStylist(stylist)}>
            Edit
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    form.setFieldValue("stylistLevel", "Normal");
    fetchData();
  }, []);
  const handleChange = (value) => {
    form.setFieldValue("stylistLevel", value);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Modal
        onOk={handleOk}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="stylistSelectionFee"
            label="stylistSelectionFee:"
            labelCol={{ span: 24 }}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="stylistLevel"
            label="stylistLevel"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input stylistLevel!",
              },
            ]}
          >
            <Select
              style={{ width: 230 }}
              onChange={handleChange}
              options={[
                {
                  value: "Normal",
                  label: "Normal",
                },
                { value: "Expert", label: "Expert" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="targetKPI"
            label="targetKPI:"
            labelCol={{ span: 24 }}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="id"></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StylistManagement;
