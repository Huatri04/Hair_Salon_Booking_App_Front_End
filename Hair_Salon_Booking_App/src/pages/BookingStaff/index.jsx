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
import React, { useEffect, useReducer, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { toast } from "react-toastify";
import "./index.scss";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/features/cartSlide";
const DEFAULT_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/theme-park-177148_960_720%20(1).jpg?alt=media&token=87cd9707-4868-4b89-bd7d-141fbebe434d";
const StylistCard = ({ id, level, name, image, selected, onSelect, fee }) => (
  <Card
    className="stylist"
    cover={<img alt={name} src={image || DEFAULT_IMAGE_URL} />}
    onClick={() => onSelect(id)} // Make the whole card clickable
    style={{
      width: "200px",
      borderColor: selected ? "green" : "default",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "220px", // Set fixed height
    }}
  >
    <Card.Meta
      title={name}
      description={
        <>
          Stylist level: {level} <br />
          Stylist Fee: {fee}
        </>
      }
    />
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

function BookingStaff() {
  const [form] = Form.useForm();
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [showStylists, setShowStylists] = useState(false);
  const currentDate = moment().format("YYYY-MM-DD");
  const nextDate = moment().add(1, "days").format("YYYY-MM-DD");

  const [date, setDate] = useState(currentDate);

  const cart = useSelector((store) => store.cart || []);
  const [discountCodes, setDiscountCodes] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [fixedTimeslots, setFixedTimeslots] = useState([
    { time: "07:00", booked: true },
    { time: "08:00", booked: true },
    { time: "09:00", booked: true },
    { time: "10:00", booked: true },
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

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Page size

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [stylistID, setStylistID] = useState("Để hệ thống tự chọn giúp bạn");
  const [loading, setLoading] = useState(false);
  const handleSelect = (id) => {
    setSelectedStylist(id);
    form.setFieldsValue({ stylistId: id });
    setStylistID(id);
  };

  useEffect(() => {
    if (stylistID === "Để hệ thống tự chọn giúp bạn") {
      fetchAvailableTimes();
    } else {
      fetchSlotStylist(stylistID);
    }
  }, [stylistID]);

  const fetchSlotStylist = async (id) => {
    try {
      const values = { stylistId: id, date: date };
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
  const handleDateChange = (value) => {
    console.log(value);
    setDate(value);
  };
  useEffect(() => {
    if (stylistID === "Để hệ thống tự chọn giúp bạn") {
      fetchAvailableTimes();
    } else {
      fetchSlotStylist(stylistID);
    }
  }, [date]);

  const fetchStylists = async () => {
    try {
      const response = await api.get(
        `stylist?page=${currentPage - 1}&size=${pageSize}`
      );
      setStylists(response.data.content);
      setTotal(response.data.totalElement); // Set total items for pagination

      console.log(response.data.content); // Log the content to inspect
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      const response = await api.get(`system/${date}`);
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
    try {
      console.log(values);
      setLoading(true);
      const { startHour, date, serviceIdList, stylistId, discountCode } =
        values;
      if (stylistId === "Để hệ thống tự chọn giúp bạn") {
        const valuesSend = { startHour, date, serviceIdList, discountCode };
        const response = await api.post("appointment/system/staff", valuesSend);
        localStorage.setItem("booking", JSON.stringify(response.data));
        dispatch(resetCart());
        toast.success("Tao lich hen thanh cong");
        navigate("/staff_page/bookSuccessful");
      } else {
        const response = await api.post("appointment/staff", values);
        localStorage.setItem("booking", JSON.stringify(response.data));
        dispatch(resetCart());
        toast.success("Tao lich hen thanh cong");
        navigate("/staff_page/bookSuccessful");
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setStylistID(value);

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
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };

  useEffect(() => {
    fetchStylists();
    fetchAvailableTimes();
    form.setFieldsValue({ serviceIdList: cart.map((product) => product.id) });
    form.setFieldsValue({ date: currentDate });
    form.setFieldsValue({ stylistId: "Để hệ thống tự chọn giúp bạn" });
    form.setFieldsValue({ discountCode: "" });
  }, []);

  useEffect(() => {
    fetchStylists();
  }, [currentPage, pageSize]);

  return (
    <div className="content_booking" style={{ marginTop: 100 }}>
      <Form
        className="form_booking_container"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name="serviceIdList"
          rules={[{ required: true, message: "Please select a service" }]}
        >
          <Link style={{ fontSize: "18px" }} to="/staff_page/bookingService">
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
          <>
            <div className="stylist-cards">
              {stylists.map((stylist) => (
                <StylistCard
                  key={stylist.id}
                  id={stylist.id}
                  level={stylist.stylistLevel}
                  name={stylist.name}
                  image={stylist.img}
                  fee={stylist.stylistSelectionFee}
                  selected={stylist.id === selectedStylist}
                  onSelect={handleSelect}
                />
              ))}
            </div>
            <div className="page_container">
              <Pagination
                current={currentPage}
                pageSize={5}
                total={total}
                onChange={handleTableChange} // Handle pagination change
              />
            </div>
          </>
        )}
        <Form.Item name="date" label="Choose Date" labelCol={{ span: 24 }}>
          <Select
            style={{ width: 230 }}
            defaultValue={currentDate}
            options={[
              { value: currentDate, label: currentDate },
              { value: nextDate, label: nextDate },
            ]}
            onSelect={handleDateChange}
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

        <div className="foot-container">
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Chốt lịch hẹn
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default BookingStaff;
