import { Button, Col, List, Pagination, Statistic, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/axios";
import "./index.css";
function LoyalPoint() {
  const user = useSelector((store) => store.user);
  const [data, setData] = useState([]);

  const [code, setCode] = useState([]);

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Page size

  const fetchCode = async (page = 1, size = 8) => {
    try {
      const response = await api.get(
        `discountCode?page=${page - 1}&size=${size}`
      );
      setCode(response.data.content);
      setTotal(response.data.totalElement); // Set total items for pagination
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleRedeemPoints = async (id) => {
    console.log(`Redeemed points for program with ID: ${id}`);
    try {
      const values = { programId: id, numberOfTrade: "1" };
      const response = await api.post("discountCode", values);
    } catch (err) {
      toast.error(err.response.data);
    }
    fetchData();
    fetchCode(currentPage, pageSize);
  };
  const fetchData = async () => {
    try {
      const response = await api.get("discountProgram?page=0&size=10");
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };

  useEffect(() => {
    fetchData();
    fetchCode(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className="content_loyal">
      <Statistic
        className="statis_container"
        title="User points"
        value={user.score}
      />
      <div className="list_item_container">
        <div className="list_container">
          <h2>Discount Programs</h2>
          <List
            className="container_list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                className="list_item_container"
                actions={[
                  <Button
                    key={`button-${item.discountProgramId}`}
                    type="primary"
                    onClick={() => handleRedeemPoints(item.discountProgramId)}
                  >
                    Use Points
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={
                    <>
                      Points Required: {item.pointChange} {" | "} Percentage
                      Discount: {item.percentage} <br />
                      Start Date:
                      {new Date(item.startedDate).toLocaleDateString("vi-VN")}
                      {" | "} End Date:
                      {new Date(item.endedDate).toLocaleDateString("vi-VN")}
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div className="list_container">
          <h2>Discount Code</h2>
          <List
            className="container_list"
            itemLayout="horizontal"
            dataSource={code}
            renderItem={(item) => (
              <List.Item className="list_item_container">
                <List.Item.Meta
                  title={item.discountCodeId}
                  description={
                    <>
                      discountProgram: {item.discountProgram.name} <br />
                      Percentage: {item.discountProgram.percentage}
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <div className="page_container">
            <Pagination
              current={currentPage}
              pageSize={8}
              total={total}
              onChange={handleTableChange} // Handle pagination change
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoyalPoint;
