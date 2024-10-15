import { TextField } from ".";

export default {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    style: {
      options: ["filled", "outlined"],
      control: { type: "select" },
    },
    stateProp: {
      options: ["enabled", "focused", "hovered", "error", "disabled"],
      control: { type: "select" },
    },
    textConfigurations: {
      options: ["input-text", "label-text", "placeholder-text"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    inputText: "Input",
    supportingText: "Supporting text",
    labelText: "Label",
    placeholderText: "Placeholder",
    showSupportingText: true,
    style: "filled",
    stateProp: "enabled",
    textConfigurations: "input-text",
    leadingIcon: true,
    trailingIcon: true,
    className: {},
    textFieldClassName: {},
    hasPlaceholderText: true,
    hasLabelTextContainer: true,
    labelTextContainerClassName: {},
    inputType: "text",
    inputType1: "text",
    inputType2: "text",
    inputType3: "text",
  },
};
