export const loaders = [
  async ({ args, originalStoryFn }) => {
    if (originalStoryFn.render) {
      const renderedStory = await originalStoryFn.render(args);
      return { renderedStory };
    }
  },
];

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}