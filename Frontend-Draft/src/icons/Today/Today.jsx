/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Today = ({ color = "#1D1B20", className }) => {
  return (
    <svg
      className={`today ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-3"
        d="M9 16.5001C8.3 16.5001 7.70833 16.2585 7.225 15.7751C6.74167 15.2918 6.5 14.7001 6.5 14.0001C6.5 13.3001 6.74167 12.7085 7.225 12.2251C7.70833 11.7418 8.3 11.5001 9 11.5001C9.7 11.5001 10.2917 11.7418 10.775 12.2251C11.2583 12.7085 11.5 13.3001 11.5 14.0001C11.5 14.7001 11.2583 15.2918 10.775 15.7751C10.2917 16.2585 9.7 16.5001 9 16.5001ZM5 22.0001C4.45 22.0001 3.97917 21.8043 3.5875 21.4126C3.19583 21.021 3 20.5501 3 20.0001V6.00012C3 5.45012 3.19583 4.97929 3.5875 4.58762C3.97917 4.19596 4.45 4.00012 5 4.00012H6V2.00012H8V4.00012H16V2.00012H18V4.00012H19C19.55 4.00012 20.0208 4.19596 20.4125 4.58762C20.8042 4.97929 21 5.45012 21 6.00012V20.0001C21 20.5501 20.8042 21.021 20.4125 21.4126C20.0208 21.8043 19.55 22.0001 19 22.0001H5ZM5 20.0001H19V10.0001H5V20.0001Z"
        fill={color}
      />
    </svg>
  );
};

Today.propTypes = {
  color: PropTypes.string,
};
