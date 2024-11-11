import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  List,
  Pagination,
  Select,
  Tag,
} from "antd";
import "./index.css";
import React, { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { toast } from "react-toastify";
import "./index.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StylistCard = ({ id, level, name, image, selected, onSelect }) => (
  <Card
    className="stylist"
    cover={
      <img
        alt={name}
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/theme-park-177148_960_720%20(1).jpg?alt=media&token=87cd9707-4868-4b89-bd7d-141fbebe434d"
      />
    }
    onClick={() => onSelect(id)} // Make the whole card clickable
    style={{
      borderColor: selected ? "green" : "default",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "200px", // Set fixed height
    }}
  >
    <Card.Meta title={name} description={<>Stylist level: {level}</>} />
    {selected && (
      <CheckCircleOutlined
        style={{
          color: "green",
          fontSize: "20px",
          display: "flex",
          justifyContent: "end",
        }}
      />
    )}
  </Card>
);

function BookingAppointment() {
  const [form] = Form.useForm();
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [showStylists, setShowStylists] = useState(false);
  const currentDate = moment().format("YYYY-MM-DD");
  const nextDate = moment().add(1, "days").format("YYYY-MM-DD");
  const cart = useSelector((store) => store.cart || []);
  const [discountCodes, setDiscountCodes] = useState([]);

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(2); // Page size

  const [fixedTimeslots, setFixedTimeslots] = useState([
    { time: "07:00", booked: true },
    { time: "08:00", booked: true },
    { time: "09:00", booked: true },
    { time: "11:00", booked: true },
    { time: "12:00", booked: true },
    { time: "13:00", booked: true },
    { time: "14:00", booked: true },
    { time: "15:00", booked: true },
    { time: "16:00", booked: true },
    { time: "17:00", booked: true },
    { time: "18:00", booked: true },
    { time: "19:00", booked: true },
    { time: "20:00", booked: true },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelect = (id) => {
    setSelectedStylist(id);
    form.setFieldsValue({ stylistId: id });
    fetchSlotStylist(id);
  };
  const fetchCode = async (page = 1, size = 2) => {
    try {
      const response = await api.get(
        `discountCode?page=${page - 1}&size=${size}`
      );
      setDiscountCodes(response.data.content);
      setTotal(response.data.totalElement); // Set total items for pagination
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const fetchSlotStylist = async (id) => {
    try {
      const values = { stylistId: id, date: currentDate };
      const response = await api.post("handmade", values);
      const apiAvailableTimes = response.data;
      console.log(apiAvailableTimes);
      const updatedSlots = fixedTimeslots.map((slot) => ({
        ...slot,
        booked: !apiAvailableTimes.includes(slot.time),
      }));
      setFixedTimeslots(updatedSlots);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchStylists = async () => {
    try {
      const response = await api.get("stylist");
      setStylists(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      console.log(currentDate);
      const response = await api.get(`system/${currentDate}`);
      const apiAvailableTimes = response.data;

      const updatedSlots = fixedTimeslots.map((slot) => ({
        ...slot,
        booked: !apiAvailableTimes.includes(slot.time),
      }));

      setFixedTimeslots(updatedSlots);
    } catch (error) {
      console.error("Error fetching available timeslots:", error);
    }
  };

  const handleSelectSlot = (time) => {
    const slot = fixedTimeslots.find((slot) => slot.time === time);
    if (slot && !slot.booked) {
      setSelectedSlot(time);
      form.setFieldsValue({ startHour: time });
    }
  };

  const handleFinish = async (values) => {
    console.log(values);
    const { startHour, date, serviceIdList, stylistId, discountCode } = values;
    if (stylistId === "Để hệ thống tự chọn giúp bạn") {
      try {
        const valuesSend = { startHour, date, serviceIdList, discountCode };
        const response = await api.post("appointment/system", valuesSend);
        toast.success("Tao lich hen thanh cong");
      } catch (err) {
        toast.error(err.response.data);
      }
    }
  };

  const handleChange = (value) => {
    if (value === "stylistChoose") {
      setShowStylists(true);
      if (stylists.length > 0) {
        handleSelect(stylists[0].id);
      }
    } else {
      setShowStylists(false);
      fetchAvailableTimes();
    }
  };

  useEffect(() => {
    fetchStylists();
    fetchAvailableTimes();
    fetchCode(currentPage, pageSize);
    form.setFieldsValue({ serviceIdList: cart.map((product) => product.id) });
    form.setFieldsValue({ date: currentDate });
    form.setFieldsValue({ stylistId: "Để hệ thống tự chọn giúp bạn" });
    form.setFieldsValue({ discountCode: "" });
  }, []);

  useEffect(() => {
    fetchCode(currentPage, pageSize); // Fetch data on page load
  }, [currentPage, pageSize]);
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  return (
    <div className="content_booking">
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="serviceIdList"
          rules={[{ required: true, message: "Please select a service" }]}
        >
          <Link style={{ fontSize: "18px" }} to="/logged_in/bookingService">
            Chọn dịch vụ
          </Link>
          <Flex gap="4px 0" wrap>
            {cart.map((product) => (
              <Tag color="#108ee9" key={product.id}>
                {product.name}
              </Tag>
            ))}
          </Flex>
        </Form.Item>
        <Form.Item
          name="stylistId"
          label="Chọn Stylist"
          labelCol={{ span: 24 }}
        >
          <Select
            defaultValue="Để hệ thống tự chọn giúp bạn"
            style={{ width: 230 }}
            onChange={handleChange}
            options={[
              {
                value: "Để hệ thống tự chọn giúp bạn",
                label: "Để hệ thống tự chọn giúp bạn",
              },
              { value: "stylistChoose", label: "Lựa Stylist theo yêu cầu" },
            ]}
          />
        </Form.Item>
        {showStylists && (
          <div className="stylist-cards">
            {stylists.map((stylist) => (
              <StylistCard
                key={stylist.id}
                id={stylist.id}
                level={stylist.stylistLevel}
                name={stylist.name}
                image={stylist.image}
                selected={stylist.id === selectedStylist}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
        <Form.Item name="date" label="Choose Date" labelCol={{ span: 24 }}>
          <Select
            style={{ width: 230 }}
            defaultValue={currentDate}
            options={[
              { value: currentDate, label: currentDate },
              { value: nextDate, label: nextDate },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="startHour"
          label="Chọn thời gian"
          labelCol={{ span: 24 }}
        >
          <div id="timeslot-list">
            {fixedTimeslots.length > 0 ? (
              fixedTimeslots.map((slot, index) => (
                <div
                  key={index}
                  style={{
                    color: slot.booked ? "red" : "black",
                    margin: "5px",
                    padding: "10px",
                    cursor: slot.booked ? "not-allowed" : "pointer",
                    backgroundColor:
                      slot.time === selectedSlot
                        ? "#d4edda"
                        : slot.booked
                        ? "#f8d7da"
                        : "#ffffff",
                    display: "inline-block", // Make it behave like a button
                    border: "1px solid #ccc", // Add border for styling
                    borderRadius: "4px", // Rounded corners
                    textAlign: "center", // Center text
                  }}
                  onClick={
                    !slot.booked ? () => handleSelectSlot(slot.time) : null
                  }
                >
                  {slot.time} {slot.booked ? "(Unavailable)" : "(Available)"}
                </div>
              ))
            ) : (
              <p>No timeslots available.</p>
            )}
          </div>
        </Form.Item>
        <div className="input-container">
          <Form.Item
            name="discountCode"
            label="Ma giam gia"
            labelCol={{ span: 24 }}
            style={{ width: 230 }}
          >
            <Input />
          </Form.Item>
          <div className="list_container">
            <h2>Discount Code</h2>
            <List
              className="container_list"
              itemLayout="horizontal"
              dataSource={discountCodes}
              renderItem={(item) => (
                <List.Item className="list_item_container">
                  <List.Item.Meta
                    title={item.discountCodeId}
                    description={
                      <>
                        discountProgram: {item.discountProgram.name} ||
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
                pageSize={2}
                total={total}
                onChange={handleTableChange} // Handle pagination change
              />
            </div>
          </div>
        </div>
        <Form.Item>
          <Button htmlType="submit">Chốt lịch hẹn</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BookingAppointment;
