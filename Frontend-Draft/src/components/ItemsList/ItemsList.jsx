/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { ItemHover } from "../ItemHover";
import "./style.css";

export const ItemsList = ({
  className,
  itemHoverLabelDivClassName,
  itemHoverStateDefaultClassName,
  itemHoverLabelLabelClassName,
  itemHoverStateDefaultClassNameOverride,
  itemHoverStateHoverClassName,
  itemHoverStateHoverClassNameOverride,
  itemHoverStatePressingClassName,
  itemHoverLabelText = "Label1",
  itemHoverStateProp = "default",
  itemHoverStateProp1 = "default",
  itemHoverStateProp2 = "default",
  itemHoverStateProp3 = "default",
  itemHoverStateProp4 = "default",
}) => {
  return (
    <div className={`items-list ${className}`}>
      <ItemHover
        className={itemHoverStateDefaultClassName}
        labelDivClassName={itemHoverLabelDivClassName}
        labelLabelClassName={itemHoverLabelLabelClassName}
        labelText={itemHoverLabelText}
        stateProp={itemHoverStateProp4}
      />
      <ItemHover className={itemHoverStateDefaultClassNameOverride} stateProp={itemHoverStateProp3} visible={false} />
      <ItemHover className={itemHoverStateHoverClassName} stateProp={itemHoverStateProp2} visible={false} />
      <ItemHover className={itemHoverStateHoverClassNameOverride} stateProp={itemHoverStateProp1} visible={false} />
      <ItemHover className={itemHoverStatePressingClassName} stateProp={itemHoverStateProp} visible={false} />
    </div>
  );
};

ItemsList.propTypes = {
  itemHoverLabelText: PropTypes.string,
  itemHoverStateProp: PropTypes.string,
  itemHoverStateProp1: PropTypes.string,
  itemHoverStateProp2: PropTypes.string,
  itemHoverStateProp3: PropTypes.string,
  itemHoverStateProp4: PropTypes.string,
};
