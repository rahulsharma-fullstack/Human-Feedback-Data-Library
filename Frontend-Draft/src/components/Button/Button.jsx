/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Icon17 } from "../../icons/Icon17";
import { Icon2 } from "../../icons/Icon2";
import "./style.css";

export const Button = ({ labelText = "Label", style, stateProp, showIcon, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    style: style || "tonal",
    state: stateProp || "disabled",
    showIcon: showIcon || true,
  });

  return (
    <div
      className={`button style-2-${state.style} state-24-${state.state} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      <div className={`state-layer-6 style-3-${state.style} state-25-${state.state} show-icon-${state.showIcon}`}>
        {((state.showIcon && state.state === "disabled" && state.style === "elevated") ||
          (state.showIcon && state.state === "disabled" && state.style === "text") ||
          (state.showIcon && state.state === "disabled" && state.style === "tonal") ||
          (state.showIcon && state.state === "enabled") ||
          (state.showIcon && state.state === "focused") ||
          (state.showIcon && state.state === "hovered") ||
          (state.showIcon && state.state === "pressed")) && (
          <Icon2
            className="icon-2"
            color={
              state.state === "disabled"
                ? "#1D1B20"
                : (state.state === "enabled" && state.style === "tonal") ||
                  (state.state === "focused" && state.style === "tonal") ||
                  (state.state === "hovered" && state.style === "tonal") ||
                  (state.state === "pressed" && state.style === "tonal")
                ? "#4A4459"
                : state.style === "filled"
                ? "white"
                : "#65558F"
            }
            opacity={state.state === "disabled" ? "0.38" : undefined}
          />
        )}

        {state.showIcon && state.state === "disabled" && ["filled", "outlined"].includes(state.style) && (
          <Icon17 className="icon-2" />
        )}

        <div className="label-text-10">{labelText}</div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hovered",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "enabled",
      };
  }

  return state;
}

Button.propTypes = {
  labelText: PropTypes.string,
  style: PropTypes.oneOf(["filled", "tonal", "elevated", "text", "outlined"]),
  stateProp: PropTypes.oneOf(["enabled", "focused", "pressed", "hovered", "disabled"]),
  showIcon: PropTypes.bool,
};
