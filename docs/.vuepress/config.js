const components = require("../../components.json");
const projectInfo = require("../../package.json");

module.exports = {
  base: "/smart-paint/",
  title: projectInfo.name,
  description: projectInfo.description,
  evergreen: true,

  themeConfig: {
    search: true,
    searchMaxSuggestions: 5,

    lastUpdated: "Last Updated",

    // Assumes GitHub. Can also be a full GitLab url.
    repo: "doudounannan/smart-paint",

    nav: [
      {
        text: "Components",
        link: "/components/"
      }
    ],

    sidebar: {
      "/components/": Object.keys(components)
    }
  },

  markdown: {
    lineNumbers: true
  },

  plugins: ["@vuepress/back-to-top"]
};
