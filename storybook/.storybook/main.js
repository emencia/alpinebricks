module.exports = {
  stories: ["../src/**/*.stories.[tj]s"],
  addons: [
    "@storybook/addon-viewport/register",
    "@storybook/addon-essentials",
    "@storybook/addon-notes/register",
    '@whitespace/storybook-addon-html'
  ],
};
