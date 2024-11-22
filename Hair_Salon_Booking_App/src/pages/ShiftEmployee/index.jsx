import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, Table } from "antd";

function ShiftEmployee() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("shiftEmployee");
      setData(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "shiftEmployeeId",
      key: "shiftEmployeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "accountForEmployee.name",
      key: "accountForEmployee.name",
      render: (text, record) => record.accountForEmployee.name,
    },

    {
      title: "stylistLevel",
      dataIndex: "accountForEmployee.stylistLevel",
      key: "accountForEmployee.stylistLevel",
      render: (text, record) => record.accountForEmployee.stylistLevel,
    },
    {
      title: "dayOfWeek",
      dataIndex: "shiftInWeek.dayOfWeek",
      key: "shiftInWeek.dayOfWeek",
      render: (text, record) => record.shiftInWeek.dayOfWeek,
    },
    {
      title: "startHour",
      dataIndex: "shiftInWeek.startHour",
      key: "shiftInWeek.startHour",
      render: (text, record) => record.shiftInWeek.startHour,
    },
    {
      title: "endHour",
      dataIndex: "shiftInWeek.endHour",
      key: "shiftInWeek.endHour",
      render: (text, record) => record.shiftInWeek.endHour,
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="shiftEmployeeId" />
    </div>
  );
}

export default ShiftEmployee;
