import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Table } from "antd";

function CRUD_template() {
  const [datas, setDatas] = useState([]);

  //GET
  const fetchData = async () => {
    try {
      const response = await api.get("feedback");
      setDatas(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Table />
    </div>
  );
}

export default CRUD_template;
