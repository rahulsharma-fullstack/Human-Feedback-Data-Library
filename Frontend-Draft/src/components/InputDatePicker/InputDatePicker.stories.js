import { InputDatePicker } from ".";

export default {
  title: "Components/InputDatePicker",
  component: InputDatePicker,
  argTypes: {
    type: {
      options: ["range", "single-input"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    showClearButton: false,
    headlinePlural: "Enter dates",
    headline: "Enter date",
    supportingText: "Select date",
    type: "range",
    className: {},
    hasHeader: true,
    textFieldHasLabelTextContainer: true,
    textFieldTextFieldClassName: {},
    hasButtonContainer: true,
  },
};
