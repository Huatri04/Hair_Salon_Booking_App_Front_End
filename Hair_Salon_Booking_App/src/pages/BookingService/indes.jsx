import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../redux/features/cartSlide";
import "./index.scss";
import { useNavigate } from "react-router-dom";
useNavigate;
function BookingService() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    <div className="service_list_container">
      <div className="product_list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="button-container">
        <div>Hello</div>
        <Button
          type="primary"
          style={{ width: "100px" }}
          onClick={() => {
            navigate("/logged_in/booking");
          }}
        >
          Xong
        </Button>
      </div>
    </div>
  );
}

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart || []); // Ensure you're accessing the correct path
  const isProductInCart = cart.some((item) => item.id === product.id); // Check if the product is in the cart

  const [selected, setSelected] = useState(isProductInCart); // Initialize selected based on cart

  // Update the selected state whenever the cart changes
  useEffect(() => {
    setSelected(isProductInCart);
  }, [isProductInCart]); // This effect will run whenever isProductInCart changes

  const handleClick = () => {
    console.log("Button clicked for:", product.name);

    if (!selected) {
      console.log("Dispatching addProduct:", product);
      dispatch(addProduct(product));
    } else {
      console.log("Dispatching removeProduct:", product);
      dispatch(removeProduct(product));
    }
  };

  return (
    <div className="product">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/theme-park-177148_960_720%20(1).jpg?alt=media&token=87cd9707-4868-4b89-bd7d-141fbebe434d"
        alt=""
      />
      <h3>{product.name}</h3>
      <p>Combo cat ky, combo goi massage</p>
      <p>Price: 500</p>
      <p>Thời gian phục vụ: 60 minutes</p>
      <center>
        <Button color="default" variant="solid" onClick={handleClick}>
          {selected ? "Đã chọn" : "Chọn"}
        </Button>
      </center>
    </div>
  );
};

export default BookingService;
