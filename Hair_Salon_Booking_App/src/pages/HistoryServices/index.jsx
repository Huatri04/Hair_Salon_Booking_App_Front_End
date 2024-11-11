import { Button, Form, Input, Rate } from "antd";
import React, { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
function HistoryServices() {
  const [openComment, setOpenComment] = useState(false);
  const [form] = useForm();

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
      <div>
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

      <div></div>
    </div>
  );
}

export default HistoryServices;
