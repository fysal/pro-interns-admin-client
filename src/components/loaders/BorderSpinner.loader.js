import React from "react";

const BorderSpinnerLoader = ({ text = "Loading please wait..." }) => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column py-3">
      <div className="spinner-border  text-pro-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text-center small mt-3">{text}</div>
    </div>
  );
};

export default BorderSpinnerLoader;
