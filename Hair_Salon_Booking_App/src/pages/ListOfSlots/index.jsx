import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import moment from "moment";

function ListOfSlots() {
  const [data, setData] = useState([]);
  const currentDate = moment().format("YYYY-MM-DD");
  const nextDate = moment().add(1, "days").format("YYYY-MM-DD");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(currentDate);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `shiftEmployee/slot/${currentDate}/${time}`
      );
      setData(response.data);
    } catch (err) {
      toast.error("Can't find slots");
    }
  };

  useEffect(() => {
    fetchData();
  }, [time, date]);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`appointment/staffDelete/${id}`);
      fetchData();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const columns = [
    {
      title: "slotId",
      dataIndex: "slotId",
      key: "slotId",
    },
    {
      title: "stylistName",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "stylistLevel",
      dataIndex: "stylistLevel",
      key: "stylistLevel",
    },
    {
      title: "startHour",
      dataIndex: "startHour",
      key: "startHour",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this slot?"
          onConfirm={() => handleDelete(record.slotId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDateChange = (value) => {
    console.log(value);
    setDate(value);
  };
  const disabledMinutes = () =>
    Array.from({ length: 60 }, (_, i) => i).filter((i) => i !== 0);
  const handleTimeChange = (time, timeString) => {
    setTime(timeString);
    console.log(timeString);
  };
  return (
    <div>
      <Select
        style={{ width: 230 }}
        defaultValue={currentDate}
        options={[
          { value: currentDate, label: currentDate },
          { value: nextDate, label: nextDate },
        ]}
        onSelect={handleDateChange}
      />
      <br />
      <br />
      <TimePicker
        onChange={handleTimeChange}
        format="HH:mm"
        disabledMinutes={disabledMinutes}
      />
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ListOfSlots;
