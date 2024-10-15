/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Label = ({ className, divClassName, text = "Label1" }) => {
  return (
    <div className={`label ${className}`}>
      <div className={`text-wrapper-3 ${divClassName}`}>{text}</div>
    </div>
  );
};

Label.propTypes = {
  text: PropTypes.string,
};
