import { Button, Form, Input, Rate, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import "./index.css";
function HistoryServices() {
  const [openComment, setOpenComment] = useState(false);
  const [form] = useForm();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await api.get("appointment");
      setData(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "cost",
      dataIndex: "cost",
      key: "cost",
    },

    {
      title: "day",
      dataIndex: "day",
      key: "day",
      render: (text, record) => {
        const date = new Date(record.day);
        return date.toLocaleDateString();
      },
    },
    {
      title: "startHour",
      dataIndex: "startHour",
      key: "startHour",
    },
    {
      title: "service",
      dataIndex: "service",
      key: "service",
      render: (text) => (
        <div>
          {text.map((item, index) => item && <div key={index}> {item}</div>)}
        </div>
      ),
    },
    {
      title: "stylist",
      dataIndex: "stylist",
      key: "stylist",
    },
  ];

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    // Handle form submission
    try {
      const response = await api.post("feedback", values);
      toast.success("Send feedback successfully");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleRateChange = (value) => {
    setOpenComment(value > 0); // Show comment input if a rating is given
  };
  return (
    <div className="content_container">
      <div className="feedback-container">
        <h1>Mời anh đánh giá trải nghiệm dịch vụ</h1>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="star" label="Rating">
            <Rate onChange={handleRateChange} />
          </Form.Item>
          {openComment && (
            <Form.Item
              name="comment"
              label="Comment"
              rules={[{ message: "Please leave a comment!" }]}
            >
              <Input.TextArea
                placeholder="Please leave your comments here"
                rows={4}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h1>Lịch sử danh sách lịch hẹn</h1>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

export default HistoryServices;
