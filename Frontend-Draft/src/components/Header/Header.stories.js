import { Header } from ".";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    state: {
      options: ["empty", "active"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "empty",
    className: {},
    menuLabelText: "Menu Label",
    menuLabelMenuLabelClassName: {},
    menuLabelDivClassName: {},
    iconsRegularChevronDownS75StyleOverrideClassName: {},
    visible: true,
  },
};
