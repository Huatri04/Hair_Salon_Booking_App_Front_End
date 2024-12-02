import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, Form, Input, Modal, Pagination, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { Checkbox, Divider } from "antd";

const CheckboxGroup = Checkbox.Group;

function ShiftFree() {
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

  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Page size

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const naviage = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    fetchOptions();
    fetchData();
  }, [currentPage, pageSize]);
  const fetchData = async () => {
    try {
      const response = await api.get(
        `stylist/workDayNull?page=${currentPage - 1}&size=${pageSize}`
      );
      setTotal(response.data.totalElement); // Set total items for pagination
      setData(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  // Chuyển đổi dữ liệu từ chuỗi thành đối tượng
  const dataSource = data.map((item) => {
    const [idPart, namePart] = item.split(", ");
    const id = idPart.split(": ")[1];
    const name = namePart.split(": ")[1];
    return { key: id, id, name };
  });

  const handleEdit = (id) => {
    setShowModal(true);
    form.setFieldValue("stylistID", id);
  };

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      fetchData();
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

  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  return (
    <div>
      <h1>Danh sách những người chưa đăng kí ca</h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={false}
      />

      <div className="page_container">
        <Pagination
          current={currentPage}
          pageSize={8}
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

export default ShiftFree;
