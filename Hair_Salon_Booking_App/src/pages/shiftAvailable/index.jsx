import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckboxGroup = Checkbox.Group;

function ShiftAvailable() {
  const [data, setData] = useState([]);
  const [plainOptions, setPlainOptions] = useState([]);

  const [checkedList, setCheckedList] = useState([]);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const fetchOptions = async () => {
    try {
      const response = await api.get("shiftInWeek");
      const options = response.data.map((item) => item.dayOfWeek);
      setPlainOptions(options);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [stylistLevel, setStylistLevel] = useState("Normal");
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Page size
  const navigate = useNavigate();
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };

  useEffect(() => {
    form1.setFieldValue("role", "Stylist");
    form1.setFieldValue("stylistLevel", stylistLevel);
    form1.submit();
    fetchOptions();
  }, [currentPage, pageSize, stylistLevel]);

  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    const workDays = record.days ? record.days.split(",") : [];
    setCheckedList(workDays);
    setShowModal(true);
    form.setFieldsValue({ stylistID: id, workDays: workDays });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "stylistLevel",
      dataIndex: "stylistLevel",
      key: "stylistLevel",
    },

    {
      title: "days",
      dataIndex: "days",
      key: "days",
      render: (days) =>
        days.split(",").map((day) => <div key={day}>{day}</div>),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              handleEdit(id);
            }}
          >
            Phan ca
          </Button>
        </>
      ),
    },
  ];
  const handleFinish = async (values) => {
    try {
      const response = await api.post("shiftEmployee/register", values);
      form1.submit();
      setCheckedList([]);
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleOk = () => {
    form.setFieldValue("workDays", checkedList);
    form.submit();
  };
  const fetchData = async (values) => {
    try {
      const response = await api.post(
        `employee?page=${currentPage - 1}&size=${pageSize}`,
        values
      );
      setData(response.data.content);
      setTotal(response.data.totalElements);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleChange = (value) => {
    setStylistLevel(value);
  };
  const handleCreate = async () => {
    try {
      const response = await api.post("shiftEmployee/createAll");
      toast.success("Tao ca tuan thanh cong");
      navigate("/manager_page/shiftEmployee");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <Button onClick={handleCreate}>Create All Shift Week</Button>
      <Form form={form1} onFinish={fetchData}>
        <Form.Item name="role"></Form.Item>
        <Form.Item name="stylistLevel">
          <Select
            onChange={handleChange}
            style={{ width: 230 }}
            options={[
              {
                value: "Normal",
                label: "Normal",
              },
              { value: "Expert", label: "Expert" },
            ]}
          />
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={5}
          total={total}
          onChange={handleTableChange} // Handle pagination change
        />
      </div>
      <Modal
        onOk={handleOk}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="workDays"
            label="workDays"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input workDays!",
              },
            ]}
          ></Form.Item>
          <>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
            <Divider />
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </>
          <Form.Item name="stylistID"></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ShiftAvailable;
