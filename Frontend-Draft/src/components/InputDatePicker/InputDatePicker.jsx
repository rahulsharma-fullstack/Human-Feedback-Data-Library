/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Today } from "../../icons/Today";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { TextField } from "../TextField";
import "./style.css";

export const InputDatePicker = ({
  showClearButton = false,
  headlinePlural = "Enter dates",
  headline = "Enter date",
  supportingText = "Select date",
  type,
  className,
  hasHeader = true,
  textFieldHasLabelTextContainer,
  textFieldTextFieldClassName,
  hasButtonContainer = true,
}) => {
  return (
    <div className={`input-date-picker ${className}`}>
      {hasHeader && (
        <div className="header-2">
          <div className={`select-date ${type}`}>{supportingText}</div>
          <div className={`date type-${type}`}>
            <div className="week-day-day">
              {type === "range" && <>{headlinePlural}</>}

              {type === "single-input" && <>{headline}</>}
            </div>
            <IconButton
              icon={<Today className="today-instance" color="#49454F" />}
              stateProp="enabled"
              style="standard"
            />
          </div>
        </div>
      )}

      <div className={`date-return type-0-${type}`}>
        {type === "range" && (
          <>
            <TextField
              className="instance-node"
              hasLabelTextContainer={textFieldHasLabelTextContainer}
              hasPlaceholderText={false}
              inputText="mm/dd/yyyy"
              labelText="Date"
              labelTextContainerClassName="text-field-instance"
              leadingIcon={false}
              showSupportingText={false}
              stateProp="focused"
              style="outlined"
              textConfigurations="input-text"
              textFieldClassName={textFieldTextFieldClassName}
              trailingIcon={false}
            />

          </>
        )}

        {type === "single-input" && (
          <TextField
            className="text-field-2"
            hasPlaceholderText={false}
            inputText="mm/dd/yyyy"
            labelText="Date"
            labelTextContainerClassName="text-field-instance"
            leadingIcon={false}
            showSupportingText={false}
            stateProp="focused"
            style="outlined"
            textConfigurations="input-text"
            trailingIcon={false}
          />
        )}
      </div>
      <div className="local-actions">
        {hasButtonContainer && (
          <div className="button-container">
            <Button className="button-instance" labelText="Cancel" showIcon={false} stateProp="enabled" style="text" />
            <Button className="button-instance" labelText="OK" showIcon={false} stateProp="enabled" style="text" />
          </div>
        )}
      </div>
    </div>
  );
};

InputDatePicker.propTypes = {
  showClearButton: PropTypes.bool,
  headlinePlural: PropTypes.string,
  headline: PropTypes.string,
  supportingText: PropTypes.string,
  type: PropTypes.oneOf(["range", "single-input"]),
  hasHeader: PropTypes.bool,
  textFieldHasLabelTextContainer: PropTypes.bool,
  hasButtonContainer: PropTypes.bool,
};
