/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { IconsRegularChevronDownS75 } from "../../icons/IconsRegularChevronDownS75";
import { IconsRegularChevronUpS } from "../../icons/IconsRegularChevronUpS";
import { Header } from "../Header";
import { ItemsList } from "../ItemsList";
import "./style.css";

export const DropdownBox = ({
  stateProp,
  className,
  headerMenuLabelMenuLabelClassName,
  headerStateEmptyClassName,
  headerMenuLabelDivClassName,
  headerIconsRegularChevronDownS75StyleOverrideClassName,
  headerMenuLabelText = "Menu Label",
  itemsFrameClassName,
  itemsListItemHoverStateDefaultClassName,
  itemsListItemHoverStateDefaultClassNameOverride,
  itemsListItemHoverLabelLabelClassName,
  itemsListItemsListClassName,
  itemsListItemHoverStateHoverClassName,
  itemsListItemHoverLabelDivClassName,
  itemsListItemHoverStateHoverClassNameOverride,
  itemsListItemHoverStatePressingClassName,
  itemsListItemHoverLabelText = "Label1",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "opened-l5",
  });

  return (
    <div
      className={`dropdown-box ${className}`}
      onClick={() => {
        dispatch("click_809");
      }}
    >
      {["opened-l1", "opened-l2", "opened-l3", "opened-l4", "opened-l5", "opened"].includes(state.state) && (
        <>
          <Header
            className="header-3"
            icon={<IconsRegularChevronUpS className="icons-regular" />}
            menuLabelMenuLabelClassName="header-instance"
            menuLabelText="Menu Label"
            onClick={() => {
              dispatch("click");
            }}
            state="active"
          />
          <div className="items-frame">
            <ItemsList
              className="items-list-4"
              itemHoverLabelText="Label1"
              itemHoverStateDefaultClassName="items-list-6"
              itemHoverStateDefaultClassNameOverride="items-list-instance"
              itemHoverStateHoverClassName="items-list-5"
              itemHoverStateHoverClassNameOverride="items-list-3"
              itemHoverStatePressingClassName="items-list-2"
              itemHoverStateProp={state.state === "opened-l5" ? "selected" : "default"}
              itemHoverStateProp1={
                state.state === "opened-l4"
                  ? "selected"
                  : ["opened-l1", "opened-l2", "opened-l3", "opened"].includes(state.state)
                  ? "default"
                  : undefined
              }
              itemHoverStateProp2={
                state.state === "opened-l3"
                  ? "selected"
                  : ["opened-l1", "opened-l2", "opened"].includes(state.state)
                  ? "default"
                  : undefined
              }
              itemHoverStateProp3={
                state.state === "opened-l2"
                  ? "selected"
                  : ["opened-l1", "opened"].includes(state.state)
                  ? "default"
                  : undefined
              }
              itemHoverStateProp4={
                state.state === "opened-l1" ? "selected" : state.state === "opened" ? "default" : undefined
              }
            />
          </div>
          <div
            className="rectangle"
            onClick={() => {
              dispatch("click_397");
            }}
          />
        </>
      )}

      {["closed-l1", "closed-l2", "closed-l3", "closed-l4", "closed-l5", "closed"].includes(state.state) && (
        <>
          <Header
            className={headerStateEmptyClassName}
            icon={<IconsRegularChevronDownS75 className="icons-regular" color="#313144" />}
            iconsRegularChevronDownS75StyleOverrideClassName={headerIconsRegularChevronDownS75StyleOverrideClassName}
            menuLabelDivClassName={headerMenuLabelDivClassName}
            menuLabelMenuLabelClassName={headerMenuLabelMenuLabelClassName}
            menuLabelText={headerMenuLabelText}
            onClick={() => {
              dispatch("click_703");
            }}
            state="empty"
            visible={
              ["closed-l1", "closed-l2", "closed-l3", "closed-l4", "closed-l5"].includes(state.state)
                ? false
                : undefined
            }
          />
          <div className={`items-list-wrapper ${itemsFrameClassName}`}>
            <ItemsList
              className={itemsListItemsListClassName}
              itemHoverLabelDivClassName={itemsListItemHoverLabelDivClassName}
              itemHoverLabelLabelClassName={itemsListItemHoverLabelLabelClassName}
              itemHoverLabelText={itemsListItemHoverLabelText}
              itemHoverStateDefaultClassName={itemsListItemHoverStateHoverClassName}
              itemHoverStateDefaultClassNameOverride={itemsListItemHoverStatePressingClassName}
              itemHoverStateHoverClassName={itemsListItemHoverStateDefaultClassName}
              itemHoverStateHoverClassNameOverride={itemsListItemHoverStateDefaultClassNameOverride}
              itemHoverStatePressingClassName={itemsListItemHoverStateHoverClassNameOverride}
              itemHoverStateProp="default"
              itemHoverStateProp1="default"
              itemHoverStateProp2="default"
              itemHoverStateProp3="default"
              itemHoverStateProp4="default"
            />
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.state === "opened-l5") {
    switch (action) {
      case "click":
        return {
          state: "closed-l5",
        };

      case "click_397":
        return {
          state: "closed-l5",
        };
    }
  }

  if (state.state === "opened-l4") {
    switch (action) {
      case "click":
        return {
          state: "closed-l4",
        };

      case "click_397":
        return {
          state: "closed-l4",
        };
    }
  }

  if (state.state === "opened-l3") {
    switch (action) {
      case "click":
        return {
          state: "closed-l3",
        };

      case "click_397":
        return {
          state: "closed-l3",
        };
    }
  }

  if (state.state === "opened-l2") {
    switch (action) {
      case "click":
        return {
          state: "closed-l2",
        };

      case "click_397":
        return {
          state: "closed-l2",
        };
    }
  }

  if (state.state === "opened-l1") {
    switch (action) {
      case "click":
        return {
          state: "closed-l1",
        };

      case "click_397":
        return {
          state: "closed-l1",
        };
    }
  }

  if (state.state === "opened") {
    switch (action) {
      case "click":
        return {
          state: "closed",
        };

      case "click_397":
        return {
          state: "closed",
        };
    }
  }

  if (state.state === "closed") {
    switch (action) {
      case "click_703":
        return {
          state: "opened",
        };
    }
  }

  if (state.state === "closed-l1") {
    switch (action) {
      case "click_809":
        return {
          state: "opened-l1",
        };
    }
  }

  if (state.state === "closed-l2") {
    switch (action) {
      case "click_809":
        return {
          state: "opened-l2",
        };
    }
  }

  if (state.state === "closed-l3") {
    switch (action) {
      case "click_809":
        return {
          state: "opened-l3",
        };
    }
  }

  if (state.state === "closed-l4") {
    switch (action) {
      case "click_809":
        return {
          state: "opened-l4",
        };
    }
  }

  if (state.state === "closed-l5") {
    switch (action) {
      case "click_809":
        return {
          state: "opened-l5",
        };
    }
  }

  return state;
}

DropdownBox.propTypes = {
  stateProp: PropTypes.oneOf([
    "opened-l1",
    "closed-l3",
    "opened-l2",
    "opened-l5",
    "opened-l4",
    "closed-l2",
    "closed",
    "closed-l1",
    "closed-l5",
    "opened",
    "closed-l4",
    "opened-l3",
  ]),
  headerMenuLabelText: PropTypes.string,
  itemsListItemHoverLabelText: PropTypes.string,
};
