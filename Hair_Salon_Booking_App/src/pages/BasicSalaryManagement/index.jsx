import {
  Button,
  Form,
  InputNumber,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function BasicSalaryManagement() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [id, setId] = useState("");
  const [isStylist, setIsStylist] = useState(false);
  const [data, setData] = useState([]);
  const [stylistLevel, setStylistLevel] = useState("Normal");
  const [total, setTotal] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(3); // Page size
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleRoleChange = (value) => {
    setIsStylist(value === "Stylist");
    form.setFieldValue("role", value);
    form.submit();
  };

  const handleLevelChange = (value) => {
    setStylistLevel(value);
    form.submit();
  };

  const handleEditBasicSalary = (id, employee) => {
    setShowModal(true);
    form1.setFieldsValue(employee);
    setId(id);
  };

  const handleEditBasicSalaryStylist = (id, employee) => {
    setShowModal(true);
    form2.setFieldsValue(employee);
    setId(id);
  };

  const handleOk = () => {
    form1.submit();
  };

  const handleOk2 = () => {
    form2.submit();
  };

  const handleSave = async (values) => {
    console.log(values);
    try {
      const response = await api.put(`editBasicSalary/${id}`, values);
      toast.success("Luu thanh cong");
      setShowModal(false);
      form.submit();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleSave2 = async (values) => {
    console.log(id);
    console.log(values);
    try {
      const response = await api.put(`salaryEditByManager/${id}`, values);
      toast.success("Luu thanh cong");
      setShowModal(false);
      form.submit();
    } catch (err) {
      toast.error(err.response.data);
    }
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
      title: "basicSalary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, employee) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEditBasicSalary(id, employee)}
          >
            Edit Basic Salary
          </Button>
        </>
      ),
    },
  ];

  const columns1 = [
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
      title: "basicSalary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "commessionOverratedFromKPI",
      dataIndex: "commessionOverratedFromKPI",
      key: "commessionOverratedFromKPI",
    },
    {
      title: "fineUnderatedFromKPI",
      dataIndex: "fineUnderatedFromKPI",
      key: "fineUnderatedFromKPI",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, employee) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEditBasicSalaryStylist(id, employee)}
          >
            Edit Basic Salary
          </Button>
        </>
      ),
    },
  ];

  const handleFinish = async (values) => {
    try {
      const response = await api.post(
        `employee?page=${currentPage - 1}&size=${pageSize}`,
        values
      );
      setData(response.data.content);
      setTotal(response.data.totalElements);
    } catch (err) {
      toast.error();
    }
  };
  const handleTableChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
    setPageSize(pageSize); // Update page size
  };
  useEffect(() => {
    form.setFieldValue("stylistLevel", stylistLevel);
    form.submit();
  }, [stylistLevel, isStylist]);

  const createAllMonths = async () => {
    try {
      const response = await api.post("salaryMonth");
      const response2 = await api.get("appointment/KPI");
      toast.success("Tao luong thang thanh cong");
      navigate("/manager_page/salaryMonths");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    form.setFieldValue("stylistLevel", stylistLevel);
    form.submit();
  }, [currentPage, pageSize]);
  return (
    <div>
      <Button
        onClick={() => {
          createAllMonths();
        }}
      >
        Create salary month
      </Button>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          label="Role "
          name="role"
          labelCol={{ span: 24 }}
          onChange={handleRoleChange}
          rules={[
            {
              required: true,
              message: "Please input Role!",
            },
          ]}
        >
          <Select
            defaultValue=""
            style={{ width: 230 }}
            onChange={handleRoleChange}
            options={[
              {
                value: "Admin",
                label: "Admin",
              },
              { value: "Staff", label: "Staff" },
              { value: "Manager", label: "Manager" },
              { value: "Stylist", label: "Stylist" },
            ]}
          />
        </Form.Item>
        {isStylist && (
          <>
            <Form.Item
              name="stylistLevel"
              label="stylistLevel:"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input stylistLevel!",
                },
              ]}
            >
              <Select
                style={{ width: 230 }}
                onChange={handleLevelChange}
                options={[
                  { value: "Normal", label: "Normal" },
                  { value: "Expert", label: "Expert" },
                ]}
              />
            </Form.Item>
            <Modal
              open={showModal}
              onCancel={() => {
                setShowModal(false);
              }}
              onOk={handleOk2}
            >
              <Form form={form2} onFinish={handleSave2}>
                <Form.Item
                  name="basicSalary"
                  label="basicSalary"
                  rules={[
                    {
                      required: true,
                      message: "Please input basicSalary!",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="commessionOverratedFromKPI"
                  label="commessionOverratedFromKPI"
                  rules={[
                    {
                      required: true,
                      message: "Please input commessionOverratedFromKPI!",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="fineUnderatedFromKPI"
                  label="fineUnderatedFromKPI"
                  rules={[
                    {
                      required: true,
                      message: "Please input fineUnderatedFromKPI!",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </Form>
            </Modal>
            <Table
              rowKey="id"
              columns={columns1}
              dataSource={data}
              pagination={false}
            />
            <div className="page_container">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handleTableChange} // Handle pagination change
              />
            </div>
          </>
        )}
      </Form>
      {!isStylist && (
        <>
          <Table columns={columns} dataSource={data} pagination={false} />
          <div className="page_container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handleTableChange} // Handle pagination change
            />
          </div>
          <Modal
            open={showModal}
            onCancel={() => {
              setShowModal(false);
            }}
            onOk={handleOk}
          >
            <Form form={form1} onFinish={handleSave}>
              <Form.Item name="basicSalary" label="basicSalary">
                <InputNumber />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
}

export default BasicSalaryManagement;
