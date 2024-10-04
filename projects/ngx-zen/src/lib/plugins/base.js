const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addVariant, e }) {
  addVariant("label", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`label${separator}${className}`)} label`;
    });
  });

  addVariant("input", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`input${separator}${className}`)} input`;
    });
  });

  addVariant("error", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`error${separator}${className}`)} .error`;
    });
  });

  addVariant("i", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`i${separator}${className}`)} i`;
    });
  });
});
