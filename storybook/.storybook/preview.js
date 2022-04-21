import { addParameters } from "@storybook/html";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import "@storybook/addon-console";

addParameters({
  a11y: {
    config: {},
    options: {},
  },
  layout: "fullscreen",
  html: {
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
    root: '.htmlcode',
    showLineNumbers: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
});

window.data = {
  knob: "kkk"
}
