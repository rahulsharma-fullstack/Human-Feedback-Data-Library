/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconsRegularChevronDownS75 } from "../../icons/IconsRegularChevronDownS75";
import { MenuLabel } from "../MenuLabel";
import "./style.css";

export const Header = ({
  state,
  className,
  menuLabelText = "Menu Label",
  menuLabelMenuLabelClassName,
  menuLabelDivClassName,
  iconsRegularChevronDownS75StyleOverrideClassName,
  onClick,
  icon = <IconsRegularChevronDownS75 className={iconsRegularChevronDownS75StyleOverrideClassName} color="#313144" />,
  visible = true,
}) => {
  return (
    <div className={`header ${state} ${className}`} onClick={onClick}>
      {visible && (
        <MenuLabel className={menuLabelMenuLabelClassName} divClassName={menuLabelDivClassName} text={menuLabelText} />
      )}

      {icon}
    </div>
  );
};

Header.propTypes = {
  state: PropTypes.oneOf(["empty", "active"]),
  menuLabelText: PropTypes.string,
  visible: PropTypes.bool,
};
