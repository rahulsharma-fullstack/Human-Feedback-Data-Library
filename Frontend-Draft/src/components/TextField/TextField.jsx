/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Icon27 } from "../../icons/Icon27";
import { Icon29 } from "../../icons/Icon29";
import { Icon49 } from "../../icons/Icon49";
import { IconButton } from "../IconButton";
import "./style.css";

export const TextField = ({
  inputText = "Input",
  supportingText = "Supporting text",
  labelText = "Label",
  placeholderText = "Placeholder",
  showSupportingText = true,
  style,
  stateProp,
  textConfigurations,
  leadingIcon,
  trailingIcon,
  className,
  textFieldClassName,
  hasPlaceholderText = true,
  hasLabelTextContainer = true,
  labelTextContainerClassName,
  inputType = "text",
  inputType1 = "text",
  inputType2 = "text",
  inputType3 = "text",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    style: style || "outlined",
    state: stateProp || "disabled",
    textConfigurations: textConfigurations || "placeholder-text",
    leadingIcon: leadingIcon || true,
    trailingIcon: trailingIcon || false,
  });

  return (
    <div
      className={`text-field ${state.state} ${state.style} ${state.textConfigurations} leading-icon-${state.leadingIcon} trailing-icon-${state.trailingIcon} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.style === "outlined" && state.state === "disabled" && (
        <>
          <div className="text-field-3">
            {state.textConfigurations === "placeholder-text" && (
              <div className="state-layer">
                {state.leadingIcon && (
                  <IconButton
                    className="icon-button-instance"
                    icon={<Icon27 className="icon" color="#1D1B20" />}
                    stateProp="enabled"
                    style="standard"
                  />
                )}

                <div className="content">
                  <div className="placeholder-text-wrapper">
                    <div className="div">{placeholderText}</div>
                  </div>
                  <div className="label-text-container">
                    <div className="text-wrapper">{labelText}</div>
                  </div>
                </div>
                {state.trailingIcon && (
                  <IconButton
                    className="icon-button-instance"
                    icon={<Icon49 className="icon" color="#1D1B20" />}
                    stateProp="enabled"
                    style="standard"
                  />
                )}
              </div>
            )}
          </div>
          <div className="disabled-state-color-2">
            {["input-text", "label-text"].includes(state.textConfigurations) && (
              <div className="state-layer-2">
                {state.leadingIcon && (
                  <IconButton
                    className="icon-button-instance"
                    icon={<Icon27 className="icon" color="#1D1B20" />}
                    stateProp="enabled"
                    style="standard"
                  />
                )}

                <div className="content">
                  <div className="div-2">
                    <div className="div">
                      {state.textConfigurations === "input-text" && <>{inputText}</>}

                      {state.textConfigurations === "label-text" && <>{labelText}</>}
                    </div>
                  </div>
                  {state.textConfigurations === "input-text" && (
                    <div className="label-text-wrapper">
                      <div className="text-wrapper">{labelText}</div>
                    </div>
                  )}
                </div>
                {state.trailingIcon && (
                  <IconButton
                    className="icon-button-instance"
                    icon={<Icon49 className="icon" color="#1D1B20" />}
                    stateProp="enabled"
                    style="standard"
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}

      {((state.state === "enabled" && state.style === "outlined") ||
        (state.state === "error" && state.style === "outlined") ||
        (state.state === "focused" && state.style === "outlined") ||
        (state.state === "hovered" && state.style === "outlined")) && (
        <div className={`state-layer-wrapper ${textFieldClassName}`}>
          <div className="state-layer-3">
            {!state.leadingIcon && (
              <div className="content">
                {((state.state === "enabled" && state.textConfigurations === "input-text") ||
                  (state.state === "enabled" && state.textConfigurations === "placeholder-text") ||
                  (state.state === "error" && state.textConfigurations === "input-text") ||
                  (state.state === "error" && state.textConfigurations === "placeholder-text") ||
                  state.state === "focused" ||
                  (state.state === "hovered" && state.textConfigurations === "input-text") ||
                  (state.state === "hovered" && state.textConfigurations === "placeholder-text")) && (
                  <div className="placeholder-text-2">
                    {state.textConfigurations === "placeholder-text" && state.state === "focused" && (
                      <img className="caret" alt="Caret" src="/img/caret.svg" />
                    )}

                    {state.textConfigurations === "input-text" && ["error", "focused"].includes(state.state) && (
                      <input className="input" placeholder={inputText} type={inputType} />
                    )}

                    {!state.trailingIcon && state.state === "focused" && (
                      <>
                        <>
                          {hasPlaceholderText && (
                            <>
                              <>
                                {["input-text", "label-text"].includes(state.textConfigurations) && (
                                  <img className="img" alt="Caret" src="/img/caret.svg" />
                                )}

                                {state.textConfigurations === "placeholder-text" && (
                                  <div className="placeholder-text-3">{placeholderText}</div>
                                )}
                              </>
                            </>
                          )}
                        </>
                      </>
                    )}

                    {state.textConfigurations === "input-text" &&
                      (state.trailingIcon || state.state === "error") &&
                      ["error", "focused"].includes(state.state) && (
                        <img
                          className="caret-2"
                          alt="Caret"
                          src={state.state === "focused" ? "/img/caret.svg" : "/img/caret-2.svg"}
                        />
                      )}

                    {((state.state === "enabled" && state.textConfigurations === "input-text") ||
                      (state.state === "enabled" &&
                        state.textConfigurations === "placeholder-text" &&
                        !state.trailingIcon) ||
                      (state.state === "error" &&
                        state.textConfigurations === "placeholder-text" &&
                        !state.trailingIcon) ||
                      (state.state === "hovered" && state.textConfigurations === "input-text" && state.trailingIcon) ||
                      (state.state === "hovered" && !state.trailingIcon) ||
                      (state.textConfigurations === "placeholder-text" && state.trailingIcon)) && (
                      <div className="placeholder-text-4">
                        {state.textConfigurations === "placeholder-text" && <>{placeholderText}</>}

                        {state.textConfigurations === "input-text" && <>{inputText}</>}
                      </div>
                    )}

                    {state.trailingIcon && state.textConfigurations === "label-text" && (
                      <img className="caret-3" alt="Caret" src="/img/caret.svg" />
                    )}
                  </div>
                )}

                {((state.state === "error" && state.textConfigurations === "input-text" && !state.trailingIcon) ||
                  (state.state === "error" && state.textConfigurations === "placeholder-text" && !state.trailingIcon) ||
                  (state.state === "focused" && state.textConfigurations === "label-text" && state.trailingIcon) ||
                  (state.textConfigurations === "input-text" && state.trailingIcon) ||
                  (state.textConfigurations === "placeholder-text" && state.trailingIcon)) && (
                  <div className="div-wrapper">
                    <div className="label-text-2">{labelText}</div>
                  </div>
                )}

                {state.textConfigurations === "label-text" && ["enabled", "error", "hovered"].includes(state.state) && (
                  <div className="div-2">
                    <div className="label-text-3">{labelText}</div>
                  </div>
                )}

                {((state.state === "enabled" && state.textConfigurations === "input-text" && !state.trailingIcon) ||
                  (state.state === "enabled" &&
                    state.textConfigurations === "placeholder-text" &&
                    !state.trailingIcon) ||
                  (state.state === "focused" && !state.trailingIcon) ||
                  (state.state === "hovered" && state.textConfigurations === "input-text" && !state.trailingIcon) ||
                  (state.state === "hovered" &&
                    state.textConfigurations === "placeholder-text" &&
                    !state.trailingIcon)) && (
                  <>
                    <>
                      {hasLabelTextContainer && (
                        <div className={`div-wrapper ${labelTextContainerClassName}`}>
                          <div className="label-text-4">{labelText}</div>
                        </div>
                      )}
                    </>
                  </>
                )}
              </div>
            )}

            {(state.leadingIcon || state.trailingIcon || state.state === "error") && (
              <IconButton
                icon={
                  state.leadingIcon ? (
                    <Icon27 className="icon" color="#49454F" />
                  ) : state.state === "error" && !state.leadingIcon ? (
                    <Icon29 className="icon" />
                  ) : (
                    <Icon49 className="icon" color="#49454F" />
                  )
                }
                stateProp="enabled"
                style="standard"
              />
            )}

            {state.leadingIcon && (
              <div className="content">
                {((state.state === "enabled" && state.textConfigurations === "input-text") ||
                  (state.state === "enabled" && state.textConfigurations === "placeholder-text") ||
                  (state.state === "error" && state.textConfigurations === "input-text") ||
                  (state.state === "error" && state.textConfigurations === "placeholder-text") ||
                  state.state === "focused" ||
                  (state.state === "hovered" && state.textConfigurations === "input-text") ||
                  (state.state === "hovered" && state.textConfigurations === "placeholder-text")) && (
                  <>
                    <div className="placeholder-text-5">
                      {state.textConfigurations === "input-text" && ["error", "focused"].includes(state.state) && (
                        <>
                          <input className="input" placeholder={inputText} type={inputType1} />
                          <img
                            className="caret-4"
                            alt="Caret"
                            src={state.state === "focused" ? "/img/caret.svg" : "/img/caret-2.svg"}
                          />
                        </>
                      )}

                      {state.textConfigurations === "placeholder-text" && state.state === "focused" && (
                        <img className="caret" alt="Caret" src="/img/caret.svg" />
                      )}

                      {(state.textConfigurations === "placeholder-text" ||
                        (state.state === "enabled" && state.textConfigurations === "input-text") ||
                        (state.state === "hovered" && state.textConfigurations === "input-text")) && (
                        <div className="placeholder-text-6">
                          {state.textConfigurations === "placeholder-text" && <>{placeholderText}</>}

                          {state.textConfigurations === "input-text" && <>{inputText}</>}
                        </div>
                      )}

                      {state.textConfigurations === "label-text" && (
                        <img className="caret-3" alt="Caret" src="/img/caret.svg" />
                      )}
                    </div>
                    <div className="label-text-container-2">
                      <div className="label-text-5">{labelText}</div>
                    </div>
                  </>
                )}

                {state.textConfigurations === "label-text" && ["enabled", "error", "hovered"].includes(state.state) && (
                  <div className="div-2">
                    <div className="label-text-6">{labelText}</div>
                  </div>
                )}
              </div>
            )}

            {state.leadingIcon && (state.trailingIcon || state.state === "error") && (
              <IconButton
                icon={
                  state.state === "error" ? <Icon29 className="icon" /> : <Icon49 className="icon" color="#49454F" />
                }
                stateProp="enabled"
                style="standard"
              />
            )}
          </div>
        </div>
      )}

      {state.style === "outlined" && (
        <>
          <>
            {showSupportingText && (
              <div className="supporting-text">
                <div className="supporting-text-2">{supportingText}</div>
              </div>
            )}
          </>
        </>
      )}

      {state.style === "filled" && state.state === "disabled" && (
        <>
          <div className="disabled-state-color" />
          <div className="state-layer-wrapper-2">
            <div className="state-layer-4">
              {state.leadingIcon && (
                <IconButton icon={<Icon27 className="icon" color="#1D1B20" />} stateProp="enabled" style="standard" />
              )}

              <div className="content">
                <div className="label-text-container-3">
                  <div className="label-text-7">{labelText}</div>
                </div>
                {["input-text", "placeholder-text"].includes(state.textConfigurations) && (
                  <div className="placeholder-text-7">
                    <div className="placeholder-text-8">
                      {state.textConfigurations === "placeholder-text" && <>{placeholderText}</>}

                      {state.textConfigurations === "input-text" && <>{inputText}</>}
                    </div>
                  </div>
                )}
              </div>
              {state.trailingIcon && (
                <IconButton icon={<Icon49 className="icon" color="#1D1B20" />} stateProp="enabled" style="standard" />
              )}
            </div>
          </div>
          <img className="active-indicator" alt="Active indicator" src="/img/active-indicator.svg" />
          <>
            {showSupportingText && (
              <div className="supporting-text-wrapper">
                <div className="supporting-text-3">{supportingText}</div>
              </div>
            )}
          </>
        </>
      )}

      {((state.state === "enabled" && state.style === "filled") ||
        (state.state === "error" && state.style === "filled") ||
        (state.state === "focused" && state.style === "filled") ||
        (state.state === "hovered" && state.style === "filled")) && (
        <>
          <div className="state-layer-wrapper-3">
            <div className="state-layer-5">
              {!state.leadingIcon && (
                <div className="content">
                  <div className="label-text-container-4">
                    <div className="label-text-8">{labelText}</div>
                  </div>
                  {((state.state === "enabled" && state.textConfigurations === "input-text") ||
                    (state.state === "enabled" && state.textConfigurations === "placeholder-text") ||
                    (state.state === "error" && state.textConfigurations === "input-text") ||
                    (state.state === "error" && state.textConfigurations === "placeholder-text") ||
                    state.state === "focused" ||
                    (state.state === "hovered" && state.textConfigurations === "input-text") ||
                    (state.state === "hovered" && state.textConfigurations === "placeholder-text")) && (
                    <div className="placeholder-text-9">
                      {state.textConfigurations === "input-text" && ["error", "focused"].includes(state.state) && (
                        <>
                          <input className="input" placeholder={inputText} type={inputType2} />
                          <img
                            className="caret-5"
                            alt="Caret"
                            src={state.state === "focused" ? "/img/caret.svg" : "/img/caret-2.svg"}
                          />
                        </>
                      )}

                      {(state.textConfigurations === "label-text" ||
                        (state.state === "focused" && state.textConfigurations === "placeholder-text")) && (
                        <img className="caret" alt="Caret" src="/img/caret.svg" />
                      )}

                      {(state.textConfigurations === "placeholder-text" ||
                        (state.state === "enabled" && state.textConfigurations === "input-text") ||
                        (state.state === "hovered" && state.textConfigurations === "input-text")) && (
                        <div className="placeholder-text-10">
                          {state.textConfigurations === "placeholder-text" && <>{placeholderText}</>}

                          {state.textConfigurations === "input-text" && <>{inputText}</>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {(state.leadingIcon || state.trailingIcon || state.state === "error") && (
                <IconButton
                  icon={
                    state.leadingIcon ? (
                      <Icon27 className="icon" color="#49454F" />
                    ) : state.state === "error" && !state.leadingIcon ? (
                      <Icon29 className="icon" />
                    ) : (
                      <Icon49 className="icon" color="#49454F" />
                    )
                  }
                  stateProp="enabled"
                  style="standard"
                />
              )}

              {state.leadingIcon && (
                <div className="content">
                  <div className="label-text-container-5">
                    <div className="label-text-9">{labelText}</div>
                  </div>
                  {((state.state === "enabled" && state.textConfigurations === "input-text") ||
                    (state.state === "enabled" && state.textConfigurations === "placeholder-text") ||
                    (state.state === "error" && state.textConfigurations === "input-text") ||
                    (state.state === "error" && state.textConfigurations === "placeholder-text") ||
                    state.state === "focused" ||
                    (state.state === "hovered" && state.textConfigurations === "input-text") ||
                    (state.state === "hovered" && state.textConfigurations === "placeholder-text")) && (
                    <div className="placeholder-text-11">
                      {state.textConfigurations === "input-text" && ["error", "focused"].includes(state.state) && (
                        <>
                          <input className="input" placeholder={inputText} type={inputType3} />
                          <img
                            className="caret-6"
                            alt="Caret"
                            src={state.state === "focused" ? "/img/caret.svg" : "/img/caret-2.svg"}
                          />
                        </>
                      )}

                      {(state.textConfigurations === "label-text" ||
                        (state.state === "focused" && state.textConfigurations === "placeholder-text")) && (
                        <img className="caret" alt="Caret" src="/img/caret.svg" />
                      )}

                      {(state.textConfigurations === "placeholder-text" ||
                        (state.state === "enabled" && state.textConfigurations === "input-text") ||
                        (state.state === "hovered" && state.textConfigurations === "input-text")) && (
                        <div className="placeholder-text-12">
                          {state.textConfigurations === "placeholder-text" && <>{placeholderText}</>}

                          {state.textConfigurations === "input-text" && <>{inputText}</>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {state.leadingIcon && (state.trailingIcon || state.state === "error") && (
                <IconButton
                  icon={
                    state.state === "error" ? <Icon29 className="icon" /> : <Icon49 className="icon" color="#49454F" />
                  }
                  stateProp="enabled"
                  style="standard"
                />
              )}
            </div>
          </div>
          <img
            className="active-indicator-2"
            alt="Active indicator"
            src={
              state.state === "error" && ["label-text", "placeholder-text"].includes(state.textConfigurations)
                ? "/img/active-indicator-1.svg"
                : state.state === "hovered" ||
                  (state.leadingIcon &&
                    !state.trailingIcon &&
                    state.state === "enabled" &&
                    state.textConfigurations === "label-text")
                ? "/img/active-indicator-2.svg"
                : state.state === "focused"
                ? "/img/active-indicator-3.svg"
                : state.state === "error" && state.textConfigurations === "input-text"
                ? "/img/active-indicator-11.svg"
                : "/img/active-indicator-4.svg"
            }
          />
          <>
            {showSupportingText && (
              <div className="supporting-text-4">
                <div className="supporting-text-5">{supportingText}</div>
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "outlined" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "outlined",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === false
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: false,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: true,
          state: "focused",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: true,
          state: "enabled",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === true &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: true,
          state: "hovered",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "placeholder-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "placeholder-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "label-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "label-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "hovered" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "click":
        return {
          leadingIcon: false,
          state: "focused",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };

      case "mouse_leave":
        return {
          leadingIcon: false,
          state: "enabled",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  if (
    state.leadingIcon === false &&
    state.state === "enabled" &&
    state.style === "filled" &&
    state.textConfigurations === "input-text" &&
    state.trailingIcon === true
  ) {
    switch (action) {
      case "mouse_enter":
        return {
          leadingIcon: false,
          state: "hovered",
          style: "filled",
          textConfigurations: "input-text",
          trailingIcon: true,
        };
    }
  }

  return state;
}

TextField.propTypes = {
  inputText: PropTypes.string,
  supportingText: PropTypes.string,
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
  showSupportingText: PropTypes.bool,
  style: PropTypes.oneOf(["filled", "outlined"]),
  stateProp: PropTypes.oneOf(["enabled", "focused", "hovered", "error", "disabled"]),
  textConfigurations: PropTypes.oneOf(["input-text", "label-text", "placeholder-text"]),
  leadingIcon: PropTypes.bool,
  trailingIcon: PropTypes.bool,
  hasPlaceholderText: PropTypes.bool,
  hasLabelTextContainer: PropTypes.bool,
  inputType: PropTypes.string,
  inputType1: PropTypes.string,
  inputType2: PropTypes.string,
  inputType3: PropTypes.string,
};
