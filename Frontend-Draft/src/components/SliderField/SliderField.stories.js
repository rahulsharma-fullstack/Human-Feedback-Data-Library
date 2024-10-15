import { SliderField } from ".";

export default {
  title: "Components/SliderField",
  component: SliderField,
  argTypes: {
    state: {
      options: ["disabled", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    hasDescription: true,
    hasLabel: true,
    description: "Description",
    label: "Label",
    state: "disabled",
    className: {},
    text: "$",
    text1: "0-100",
    blockClassName: {},
    knobStartClassName: {},
    knobEndClassName: {},
  },
};
