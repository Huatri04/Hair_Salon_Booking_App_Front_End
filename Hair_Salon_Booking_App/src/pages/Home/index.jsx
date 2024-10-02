import React from "react";
import Default_template from "../../components/default_template/index.jsx";
import "./index.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="content_container">
      <img
        className="image_market"
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/blob%20(1).jpg?alt=media&token=a49b71a9-55f6-4446-9d75-e442e55dedb7"
        alt=""
      />
      <div className="container_button">
        <Button onClick={() => navigate("/loginCustomer")}>Đặt lịch hẹn</Button>
      </div>
      <div className="container">
        <h1 className="head_title">Loại dịch vụ:</h1>
        <div className="image_container">
          <div className="container_item">
            <img
              className="item"
              src="https://storage.30shine.com/web/v4/images/uon-trang-chu/uon-1.jpg"
              alt=""
            />

            <span className="text">CẮT TÓC</span>

            <span className="support">Tìm hiểu thêm</span>
          </div>
          <div className="container_item">
            <img
              className="item"
              src="https://storage.30shine.com/web/v4/images/uon-trang-chu/uon-2.jpg"
              alt=""
            />

            <span className="text">UỐN ĐỊNH HÌNH</span>

            <span className="support">Tìm hiểu thêm</span>
          </div>
          <div className="container_item">
            <img
              className="item"
              src="https://storage.30shine.com/web/v4/images/uon-trang-chu/uon-3.jpg"
              alt=""
            />

            <span className="text">THAY ĐỔI MÀU TÓC</span>

            <span className="support">Tìm hiểu thêm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
