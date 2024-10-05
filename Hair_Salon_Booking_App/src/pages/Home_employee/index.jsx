import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
function Home_employee() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container_home_admin_page">
      <img
        className="image_market"
        src="https://firebasestorage.googleapis.com/v0/b/hair-d1f00.appspot.com/o/blob%20(1).jpg?alt=media&token=a49b71a9-55f6-4446-9d75-e442e55dedb7"
        alt=""
      />
      <div className="welcome_container">
        <h1>Welcome, {user.name}</h1>
      </div>
    </div>
  );
}

export default Home_employee;
