/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icon2 = ({ color = "#1D1B20", opacity = "unset", className }) => {
  return (
    <svg
      className={`icon-2 ${className}`}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-3"
        d="M8.25 9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
};

Icon2.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
