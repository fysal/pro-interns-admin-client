import React from "react";
import "./inputStyles.module.css";
import clsx from "clsx";

const SearchBox = ({
  type = "text",
  placeholder,
  name,
  id,
  onChange,
  value = "",
  classes = "",
  label,
}) => {
  return (
    <>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={clsx(`form-control`, classes)}
        name={name}
        id={id}
        onChange={onChange}
      />
    </>
  );
};

export default SearchBox;
