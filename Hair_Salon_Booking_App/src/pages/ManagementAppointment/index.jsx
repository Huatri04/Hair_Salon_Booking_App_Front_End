import {
  Button,
  Form,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Table,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";
import "./index.css";
import { useNavigate } from "react-router-dom";
function ManagementAppointment() {
  const [data, setData] = useState([]);
  const currentDate = moment().format("YYYY-MM-DD");
  const nextDate = moment().add(1, "days").format("YYYY-MM-DD");
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(4); // Page size

  const disabledMinutes = () =>
    Array.from({ length: 60 }, (_, i) => i).filter((i) => i !== 0);

  const handleDateChange = (value) => {
    setDate(value);
  };
  const handleEditAppointment = (id) => {
    setShowModal(true);
    setId(id);
    console.log(id);
  };
  const handleTimeChange = (time, timeString) => {
    setTime(timeString);
    console.log(timeString);
  };
  const fetchData = async () => {
    try {
      setData([]);
      const response = await api.get(
        `appointment/uncompleted/${date}/${time}?page=${
          currentPage - 1
        }&size=${pageSize}`
      );
      setData(response.data.content);
      setTotal(response.data.totalElements);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchData();
  }, [date, time]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
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
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button type="primary" onClick={() => handleEditAppointment(id)}>
            Thanh toan
          </Button>
        </>
      ),
    },
  ];

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await api.put(`appointment/complete/${id}`, values);
      console.log(response.data);

      window.location.href = `${response.data}`;

      toast.success("Thanh toan thanh cong");
      fetchData();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h1>Chọn ngày</h1>
      <Select
        style={{ width: 230 }}
        defaultValue={currentDate}
        onChange={handleDateChange}
        options={[
          { value: currentDate, label: currentDate },
          { value: nextDate, label: nextDate },
        ]}
      />
      <br />
      <br />
      <h1>Chọn giờ</h1>
      <div className="create_container">
        <TimePicker
          onChange={handleTimeChange}
          format="HH:mm"
          disabledMinutes={disabledMinutes}
        />
        <Button
          onClick={() => {
            navigate("/staff_page/booking");
          }}
          type="primary"
        >
          Đặt lịch hẹn
        </Button>
      </div>
      <br />
      <br />
      <h1>Danh sach lich hen cho thanh toan</h1>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={4}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        loading={loading}
        onOk={handleOk}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="paymentType"
            label="paymentType"
            rules={[
              {
                required: true,
                message: "Please input paymentType!",
              },
            ]}
          >
            <Select
              onChange={handleChange}
              style={{ width: 230 }}
              options={[
                {
                  value: "Cash",
                  label: "Cash",
                },
                { value: "Banking", label: "Banking" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagementAppointment;
