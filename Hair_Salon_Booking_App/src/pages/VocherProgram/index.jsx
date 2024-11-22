import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Popconfirm,
  Table,
} from "antd";
import dayjs from "dayjs";
function VoucherProgram() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Page size
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setEditingID] = useState(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "discountProgramId",
      key: "discountProgramId",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "startedDate",
      dataIndex: "startedDate",
      key: "startedDate",
      render: (text, record) => {
        const date = new Date(record.startedDate);
        return date.toLocaleDateString();
      },
    },
    {
      title: "endedDate",
      dataIndex: "endedDate",
      key: "endedDate",
      render: (text, record) => {
        const date = new Date(record.endedDate);
        return date.toLocaleDateString();
      },
    },
    {
      title: "percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "pointChange",
      dataIndex: "pointChange",
      key: "pointChange",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsEditing(true);
              form.setFieldsValue({
                name: record.name,
                description: record.description,
                startedDate: dayjs(record.startedDate),
                endedDate: dayjs(record.endedDate),
                percentage: record.percentage * 100,
                pointChange: record.pointChange,
              });
              setStartDate(dayjs(record.startedDate));
              setEndDate(dayjs(record.endedDate));
              setIsEditing(true);
              setEditingID(record.discountProgramId);
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this discount program?"
            onConfirm={() => handleDelete(record.discountProgramId)}
            okText="Yes"
            cancelText="No"
          >
            <br />
            <br />
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => {
              handleStart(record.discountProgramId);
            }}
          >
            Start Program
          </Button>
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => {
              handleEnd(record.discountProgramId);
            }}
            danger
          >
            End Program
          </Button>
        </>
      ),
    },
  ];
  const handleEnd = async (id) => {
    try {
      await api.delete(`discountProgram/discountProgram/end/${id}`);
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleStart = async (id) => {
    try {
      await api.put(`discountProgram/discountProgram/start/${id}`);
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  const fetchData = async () => {
    try {
      const response = await api.get(
        `discountProgram/manager?page=${currentPage - 1}&size=${pageSize}`
      );
      setData(response.data.content);
      setTotal(response.data.totalElement);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);
  const handleSumbit = () => {
    form.submit();
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`discountProgram/${id}`);
      fetchData();
      toast.success("Discount program deleted successfully");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleFinish = async (values) => {
    values.percentage = values.percentage / 100;
    console.log(values);
    if (isEditing) {
      try {
        const response = await api.put(`discountProgram/${editingID}`, values);
        fetchData();
        toast.success("Update successful");
      } catch (err) {
        toast.error(err.response.data);
      } finally {
        setShowModal(false);
        setIsEditing(false);
      }
    } else {
      try {
        const response = api.post("discountProgram", values);
        setStartDate(null);
        setEndDate(null);
        form.resetFields();
        fetchData();
      } catch (err) {
        toast.error(err.response.data);
      } finally {
        setShowModal(false);
      }
    }
  };

  const onChangeStartDate = (date, dateString) => {
    form.setFieldValue("startedDate", dateString);
    setStartDate(date);
  };
  const onChangeEndedDate = (date, dateString) => {
    form.setFieldValue("endedDate", dateString);
    setEndDate(date);
  };
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add Discount Program</Button>
      <br />
      <br />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"discountProgramId"}
        pagination={false}
      />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={5}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        onOk={() => {
          handleSumbit();
        }}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="description"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="startedDate"
            label="startedDate	"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          ></Form.Item>
          <DatePicker
            value={startDate}
            onChange={onChangeStartDate}
            format="YYYY-MM-DD"
          />
          <br />
          <br />
          <Form.Item
            name="endedDate"
            label="endedDate"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select the end date!" }]}
          ></Form.Item>
          <DatePicker
            value={endDate}
            onChange={onChangeEndedDate}
            format="YYYY-MM-DD"
          />
          <br />
          <br />
          <Form.Item
            name="percentage"
            label="percentage"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input the percentage!" },
            ]}
          >
            <InputNumber
              style={{ width: "30%" }}
              min={0}
              max={100}
              step={0.01}
              precision={2}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
            />
          </Form.Item>
          <Form.Item
            name="pointChange"
            label="pointChange"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input the pointChange!" },
            ]}
          >
            <InputNumber
              style={{ width: "30%" }}
              min={0}
              step={1} // Step is 1, ensuring only integers are allowed
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default VoucherProgram;
