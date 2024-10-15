import { IconButton } from ".";

export default {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    style: {
      options: ["filled", "outlined", "tonal", "standard"],
      control: { type: "select" },
    },
    stateProp: {
      options: ["enabled", "focused", "pressed", "hovered", "disabled"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    style: "filled",
    stateProp: "enabled",
    className: {},
  },
};
