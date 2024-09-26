import React from "react";
import "./index.css";
function Authentication_template({ children }) {
  return (
    <div className="authen_template">
      <div className="authen_template__form">{children}</div>
    </div>
  );
}

export default Authentication_template;
