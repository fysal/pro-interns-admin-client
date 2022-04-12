import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles/inputStyles";

const SelectFilter = ({ list = [], name, id, onChange, placeholder, label }) => {
  const classes = useStyles();
  return (<> 
  {label && <label className="form-label">{label}</label>}
  <select name={name} onChange={onChange} id={id} className="form-select small text-capitalize">
        <option value="any">{placeholder}</option>
      {list.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select></>
  
  );
};

export default SelectFilter;
