import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, Popconfirm, Table } from "antd";
import { toast } from "react-toastify";

function ListOfShifts() {
  function getWeekStartAndEnd() {
    let now = new Date();
    let currentMonday = new Date(now);
    currentMonday.setDate(now.getDate() - now.getDay() + 1);
    let currentSunday = new Date(currentMonday);
    currentSunday.setDate(currentMonday.getDate() + 6);
    function formatDate(date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return {
      currentMonday: formatDate(currentMonday),
      currentSunday: formatDate(currentSunday),
    };
  }
  let { currentMonday, currentSunday } = getWeekStartAndEnd();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `shiftEmployee/staff/${currentMonday}?page=1&pageSize=5`
      );
      setData(response.data.content);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleDelete = async (record) => {
    const values = { stylistId: record.employeeId, date: record.date };
    try {
      const response = await api.delete("appointment/deleteAll", {
        data: values,
      });
      fetchData();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "dayInWeek",
      dataIndex: "dayInWeek",
      key: "dayInWeek",
    },
    {
      title: "employeeId",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
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
      dataIndex: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this shift?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <h1>Weekly Timetable</h1>
      Monday {currentMonday} --- Sunday {currentSunday}
      <br />
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ListOfShifts;
