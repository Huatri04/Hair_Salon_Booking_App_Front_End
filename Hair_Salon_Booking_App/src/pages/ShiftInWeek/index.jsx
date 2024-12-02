import {
  Button,
  DatePicker,
  Form,
  message,
  Modal,
  Select,
  Table,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

function ShiftInWeek() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.setFieldValue("dayOfWeek", "");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("shiftInWeek");
      setData(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const columns = [
    {
      title: "dayOfWeek",
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
    {
      title: "startHour",
      dataIndex: "startHour",
      key: "startHour",
    },

    {
      title: "endHour",
      dataIndex: "endHour",
      key: "endHour",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              editRecord(record);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];
  const editRecord = (record) => {
    setShowModal(true);
    form.setFieldsValue({
      dayOfWeek: record.dayOfWeek,
      startHour: moment(record.startHour, "HH:mm"),
      endHour: moment(record.endHour, "HH:mm"),
    });
  };

  const disabledMinutes = () =>
    Array.from({ length: 60 }, (_, i) => i).filter((i) => i !== 0);

  const handleTimeStartChange = (time, timeString) => {
    form.setFieldValue("startHour", timeString);
  };
  const handleTimeEndChange = (time, timeString) => {
    form.setFieldValue("endHour", timeString);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleFinish = async (values) => {
    setLoading(true);
    console.log(values.dateApply);
    console.log(values.endHour);
    try {
      const response = await api.post("shiftInWeek", values);
      toast.success("Tao thanh cong");
      setShowModal(false);
      form.resetFields();
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="button_container">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add
        </Button>
        <Modal
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            form.resetFields();
          }}
          onOk={handleOk} // Use handleOk for form submission
          loading={loading}
        >
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              label="dayOfWeek:"
              name="dayOfWeek"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input dayOfWeek!",
                },
              ]}
            >
              <Select
                style={{ width: 230 }}
                options={[
                  {
                    value: "MONDAY",
                    label: "MONDAY",
                  },
                  { value: "TUESDAY", label: "TUESDAY" },
                  {
                    value: "WEDNESDAY",
                    label: "WEDNESDAY",
                  },
                  {
                    value: "THURSDAY",
                    label: "THURSDAY",
                  },
                  {
                    value: "FRIDAY",
                    label: "FRIDAY",
                  },
                  {
                    value: "SATURDAY",
                    label: "SATURDAY",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="startHour:"
              name="startHour"
              rules={[
                {
                  required: true,
                  message: "Please input startHour!",
                },
              ]}
            ></Form.Item>
            <TimePicker
              onChange={handleTimeStartChange}
              format="HH:mm"
              disabledMinutes={disabledMinutes}
            />
            <br />
            <br />

            <Form.Item
              label="endHour:"
              name="endHour"
              rules={[
                {
                  required: true,
                  message: "Please input endHour!",
                },
              ]}
            ></Form.Item>
            <TimePicker
              onChange={handleTimeEndChange}
              format="HH:mm"
              disabledMinutes={disabledMinutes}
            />
            <br />
            <br />
          </Form>
        </Modal>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="dayOfWeek"
      />
    </div>
  );
}

export default ShiftInWeek;
