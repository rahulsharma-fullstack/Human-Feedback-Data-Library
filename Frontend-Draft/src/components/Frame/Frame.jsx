/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Frame = ({
  className,
  divClassName,
  text = "Analysis Name",
  divClassNameOverride,
  text1 = "Founder Break-Even Calculator",
  divClassName1,
  text2 = "Comparable",
  divClassName2,
  text3 = "Bank",
  divClassName3,
  text4 = "John Smith",
  frameClassName,
  divClassName4,
  text5 = "21.03.2021",
  divClassName5,
  text6 = "14.07.2021",
}) => {
  return (
    <div className={`frame ${className}`}>
      <div className="analysis-name-wrapper">
        <div className={`text-wrapper ${divClassName}`}>{text}</div>
      </div>

      <div className="founder-break-even-wrapper">
        <div className={`text-wrapper ${divClassNameOverride}`}>{text1}</div>
      </div>

      <div className="comparable-wrapper">
        <div className={`text-wrapper ${divClassName1}`}>{text2}</div>
      </div>

      <div className="div-wrapper">
        <div className={`text-wrapper ${divClassName2}`}>{text3}</div>
      </div>

      <div className="div-wrapper">
        <div className={`text-wrapper ${divClassName3}`}>{text4}</div>
      </div>

      <div className={`element-wrapper ${frameClassName}`}>
        <div className={`text-wrapper ${divClassName4}`}>{text5}</div>
      </div>

      <div className="element-wrapper">
        <div className={`text-wrapper ${divClassName5}`}>{text6}</div>
      </div>

      <img
        className="img"
        alt="Frame"
        src="https://c.animaapp.com/lKt1Z3dQ/img/frame-41.svg"
      />
    </div>
  );
};

Frame.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  text6: PropTypes.string,
};
