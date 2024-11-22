import React, { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Statistic, Tooltip } from "antd";
import api from "../../config/axios";
import { Cell, Legend, Pie, PieChart } from "recharts";
import Item from "antd/es/list/Item";
function Dashboard() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await api.get("stats");
      setData(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#758cc5", "#9775c5"];
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="totalEmployee"
              value={data?.totalEmployee}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="totalCustomerAccount"
              value={data?.totalCustomer}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: 20, display: Flex }}>
        <PieChart width={730} height={250}>
          <Pie
            data={data?.topServiceList}
            dataKey="serviceCount"
            nameKey="serviceName"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data?.topServiceList.map((item, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default Dashboard;
