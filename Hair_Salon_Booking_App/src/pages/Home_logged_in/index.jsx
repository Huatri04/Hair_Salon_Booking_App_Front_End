import React, { useEffect, useState } from "react";
import "./index.css";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios.js";
import { toast } from "react-toastify";
import "./index.scss";
function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await api.get("availableService");
      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetch product: ", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="content_container">
      <img
        className="image_market"
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/blob%20(1).jpg?alt=media&token=a49b71a9-55f6-4446-9d75-e442e55dedb7"
        alt=""
      />
      <div className="container_button">
        <Button
          color="default"
          variant="solid"
          onClick={() => {
            navigate("/logged_in/booking");
          }}
        >
          Đặt lịch hẹn
        </Button>
      </div>
      <div className="container">
        <div className="product_list">
          {products.map((product) => (
            <Product key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/theme-park-177148_960_720%20(1).jpg?alt=media&token=87cd9707-4868-4b89-bd7d-141fbebe434d"
        alt=""
      />
      <h3>{product.name}</h3>
      <p></p>
      <p>Price: {product.cost}</p>
      <p>Thời gian phục vụ: {product.timeOfService} minutes</p>
      <center>
        <Button
          color="default"
          variant="solid"
          onClick={() => {
            navigate("/logged_in/booking");
          }}
        >
          Đặt lịch hẹn
        </Button>
      </center>
    </div>
  );
};

export default Home;
