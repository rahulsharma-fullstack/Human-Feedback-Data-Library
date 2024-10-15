import { ItemHover } from ".";

export default {
  title: "Components/ItemHover",
  component: ItemHover,
  argTypes: {
    stateProp: {
      options: ["pressing", "hover", "selected", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "pressing",
    className: {},
    labelDivClassName: {},
    labelLabelClassName: {},
    visible: true,
    labelText: "Label1",
  },
};
