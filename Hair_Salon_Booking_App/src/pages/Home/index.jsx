import React from "react";
import Default_template from "../../components/default_template/index.jsx";
import "./index.css";
import { Button } from "antd";
function Home() {
  return (
    <Default_template>
      <div className="content_container">
        <img
          className="image_market"
          src="https://copilot.microsoft.com/images/blob?bcid=S3uc5ZsRMIwHMnEKYrWcKYtB7Z0m.....8o"
          alt=""
        />
        <div className="container_button">
          <Button className="button">Đặt lịch hẹn</Button>
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
    </Default_template>
  );
}

export default Home;
