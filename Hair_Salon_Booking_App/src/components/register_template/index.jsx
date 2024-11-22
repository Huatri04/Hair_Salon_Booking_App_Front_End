import React from "react";
import "./index.css";
function Register_template({ children }) {
  return (
    <div className="register_template">
      <div className="register_template__form">{children}</div>
    </div>
  );
}

export default Register_template;
