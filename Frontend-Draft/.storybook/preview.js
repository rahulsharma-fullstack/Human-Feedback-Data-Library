import React from "react";
import { fn } from "@storybook/test";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: {
      onClick: fn(),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [(Story, context) => <Story key={JSON.stringify(context.args)} />];

export default preview;
