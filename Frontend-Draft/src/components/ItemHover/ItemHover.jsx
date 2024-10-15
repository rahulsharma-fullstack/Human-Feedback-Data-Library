/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { IconsRegular } from "../IconsRegular";
import { Label } from "../Label";
import "./style.css";

export const ItemHover = ({
  stateProp,
  className,
  labelDivClassName,
  labelLabelClassName,
  visible = true,
  labelText = "Label1",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });

  return (
    <div
      className={`item-hover ${state.state} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {visible && <Label className={labelLabelClassName} divClassName={labelDivClassName} text={labelText} />}

      <IconsRegular />
    </div>
  );
};

function reducer(state, action) {
  if (state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          state: "selected",
        };
    }
  }

  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };
  }

  return state;
}

ItemHover.propTypes = {
  stateProp: PropTypes.oneOf(["pressing", "hover", "selected", "default"]),
  visible: PropTypes.bool,
  labelText: PropTypes.string,
};
