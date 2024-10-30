import { Table, Button, Form, Input, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function Workschedule() {
  const [schedules, setSchedules] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditDay, setCurrentEditDay] = useState(null);
  const [form] = Form.useForm();

  // Lấy lịch làm việc từ API
  const fetchSchedules = async () => {
    try {
      const response = await api.get("/shiftInWeek");
      console.log("Fetched schedules:", response.data);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules(); // Gọi hàm lấy lịch khi component mount
  }, []);

  // Xử lý việc thêm ca làm
  const handleAddSchedule = async (values) => {
    try {
      await api.post("/shiftInWeek", values);
      fetchSchedules(); // Cập nhật danh sách lịch sau khi thêm
      setOpenModal(false); // Đóng modal
      form.resetFields(); // Reset form
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  // Xử lý việc cập nhật ca làm
  const handleEditSchedule = async (values) => {
    try {
      await api.put(`/shiftInWeek/${currentEditDay}`, values);
      fetchSchedules(); // Cập nhật danh sách lịch sau khi chỉnh sửa
      setOpenModal(false); // Đóng modal
      form.resetFields(); // Reset form
      setIsEditing(false); // Reset trạng thái chỉnh sửa
      setCurrentEditDay(null); // Reset current edit day
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDeleteSchedule = async (dayOfWeek) => {
    try {
      await api.delete(`/shiftInWeek/${dayOfWeek}`);
      fetchSchedules(); //cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting schedule", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields(); // Reset form fields khi đóng modal
  };

  const handleOpenEditModal = (schedule) => {
    form.setFieldsValue(schedule); // Điền thông tin vào form để chỉnh sửa
    setCurrentEditDay(schedule.dayOfWeek); // Lưu dayOfWeek để sử dụng khi cập nhật
    setIsEditing(true); // Đánh dấu là đang chỉnh sửa
    setOpenModal(true); // Mở modal
  };

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: "Thứ",
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startHour",
      key: "startHour",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endHour",
      key: "endHour",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleOpenEditModal(record)}
            type="primary"
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this shift?"
            onConfirm={() => handleDeleteSchedule(record.dayOfWeek)}
            okText="OK"
            cancelText="Cancel"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Work Schedule</h1>
      <Button onClick={() => setOpenModal(true)}>Add New Schedule</Button>
      <Table
        columns={columns}
        dataSource={schedules}
        rowKey="dayOfWeek"
        style={{ marginTop: "20px" }}
      />

      <Modal
        title={isEditing ? "Edit Work Schedule" : "Add New Work Schedule"}
        open={openModal}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {isEditing ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={isEditing ? handleEditSchedule : handleAddSchedule}
        >
          <Form.Item
            name="dayOfWeek"
            label="Thứ"
            rules={[{ required: true, message: "Vui lòng nhập thứ!" }]}
          >
            <Input placeholder="Thứ" disabled={isEditing} />
          </Form.Item>
          <Form.Item
            name="startHour"
            label="Giờ bắt đầu"
            rules={[{ required: true, message: "Vui lòng nhập giờ bắt đầu!" }]}
          >
            <Input placeholder="Giờ bắt đầu" />
          </Form.Item>
          <Form.Item
            name="endHour"
            label="Giờ kết thúc"
            rules={[{ required: true, message: "Vui lòng nhập giờ kết thúc!" }]}
          >
            <Input placeholder="Giờ kết thúc" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Workschedule;
