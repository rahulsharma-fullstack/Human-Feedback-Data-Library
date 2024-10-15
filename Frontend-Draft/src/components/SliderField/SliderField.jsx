/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const SliderField = ({
  hasDescription = true,
  hasLabel = true,
  description = "Description",
  label = "Label",
  state,
  className,
  text = "$",
  text1 = "0-100",
  blockClassName,
  knobStartClassName,
  knobEndClassName,
}) => {
  return (
    <div className={`slider-field ${className}`}>
      {hasLabel && (
        <div className="label-2">
          <div className="label-3">{label}</div>
          <div className="slider-output">
            <div className="text-wrapper-4">{text}</div>
            <div className="text-wrapper-4">{text1}</div>
          </div>
        </div>
      )}

      <div className="slider">
        <div className={`block ${blockClassName}`}>
          <div className={`knob-start state-20-${state} ${knobStartClassName}`} />
          <div className="slider-2" />
          <div className={`knob-end state-21-${state} ${knobEndClassName}`} />
        </div>
      </div>
      {hasDescription && <div className="description">{description}</div>}
    </div>
  );
};

SliderField.propTypes = {
  hasDescription: PropTypes.bool,
  hasLabel: PropTypes.bool,
  description: PropTypes.string,
  label: PropTypes.string,
  state: PropTypes.oneOf(["disabled", "default"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
