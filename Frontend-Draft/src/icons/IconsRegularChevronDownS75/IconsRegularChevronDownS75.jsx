/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const IconsRegularChevronDownS75 = ({ color = "#8F929B", className }) => {
  return (
    <svg
      className={`icons-regular-chevron-down-s-75 ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-3"
        clipRule="evenodd"
        d="M5.58934 7.74408C5.2639 7.41864 4.73626 7.41864 4.41083 7.74408C4.08539 8.06951 4.08539 8.59715 4.41083 8.92259L9.41083 13.9226C9.73626 14.248 10.2639 14.248 10.5893 13.9226L15.5893 8.92259C15.9148 8.59715 15.9148 8.06951 15.5893 7.74408C15.2639 7.41864 14.7363 7.41864 14.4108 7.74408L10.0001 12.1548L5.58934 7.74408Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

IconsRegularChevronDownS75.propTypes = {
  color: PropTypes.string,
};
