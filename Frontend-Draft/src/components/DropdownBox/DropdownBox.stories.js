import { DropdownBox } from ".";

export default {
  title: "Components/DropdownBox",
  component: DropdownBox,
  argTypes: {
    stateProp: {
      options: [
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
      ],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "opened-l1",
    className: {},
    headerMenuLabelMenuLabelClassName: {},
    headerStateEmptyClassName: {},
    headerMenuLabelDivClassName: {},
    headerIconsRegularChevronDownS75StyleOverrideClassName: {},
    headerMenuLabelText: "Menu Label",
    itemsFrameClassName: {},
    itemsListItemHoverStateDefaultClassName: {},
    itemsListItemHoverStateDefaultClassNameOverride: {},
    itemsListItemHoverLabelLabelClassName: {},
    itemsListItemsListClassName: {},
    itemsListItemHoverStateHoverClassName: {},
    itemsListItemHoverLabelDivClassName: {},
    itemsListItemHoverStateHoverClassNameOverride: {},
    itemsListItemHoverStatePressingClassName: {},
    itemsListItemHoverLabelText: "Label1",
  },
};
