const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addVariant, e }) {
  addVariant("label", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`label${separator}${className}`)} label`;
    });
  });

  addVariant("input", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`input${separator}${className}`)} input.__zen__form__control__input`;
    });
  });

  addVariant("search", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`search${separator}${className}`)} input.__zen__form__control__search`;
    });
  });

  addVariant("error", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`error${separator}${className}`)} .error`;
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

  addVariant("options", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`options${separator}${className}`)} .options`;
    });
  });

  addVariant("option", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`option${separator}${className}`)} .option`;
    });
  });
});
