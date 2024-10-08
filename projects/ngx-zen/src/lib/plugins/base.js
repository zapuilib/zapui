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

  addVariant("icon", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`icon${separator}${className}`)} .icon`;
    });
  });

  addVariant("textarea", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`textarea${separator}${className}`)} textarea`;
    });
  });

  addVariant("handler", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`handler${separator}${className}`)} .handler`;
    });
  });

  addVariant("modal", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`modal${separator}${className}`)} .modal`;
    });
  });

  addVariant("wrapper", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`wrapper${separator}${className}`)} .wrapper`;
    });
  });

  addVariant("fieldset", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`fieldset${separator}${className}`)} fieldset`;
    });
  });
});
