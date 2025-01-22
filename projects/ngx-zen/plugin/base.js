const plugin = require("tailwindcss/plugin");

function createZenVariant(name, targetElement, e) {
  return ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`${name}${separator}${className}`)} ${targetElement}`;
    });
  };
}

module.exports = plugin(function ({ addVariant, e }) {
  const variants = [
    { name: "label", targetElement: "label" },
    { name: "input", targetElement: ".__zen__form__control__input" },
    { name: "error", targetElement: ".error" },
    { name: "textarea", targetElement: "textarea" },
    { name: "handler", targetElement: ".handler" },
    { name: "modal", targetElement: ".modal" },
    { name: "wrapper", targetElement: ".wrapper" },
    { name: "fieldset", targetElement: "fieldset" },
    { name: "chip-icon", targetElement: ".chip__icon" },
    { name: "chip-text", targetElement: ".chip__text" },
    { name: "select", targetElement: ".__zen__form__control__select" },
    { name: "select-placeholder", targetElement: ".__zen__form__control__select .__zen__form__control__placeholder" },
    { name: "select-dropdown", targetElement: ".__zen__form__control__select .__zen__form__control__dropdown" },
    { name: "select-icon", targetElement: ".__zen__form__control__select .__zen__form__control__icon" },
    { name: "select-selected", targetElement: ".__zen__form__control__select .__zen__form__control__selected" },
    { name: "search", targetElement: ".__zen__form__control__search" },
    { name: "search-icon", targetElement: ".__zen__form__control__search__icon" },
    { name: "options", targetElement: ".__zen__form__control__options" },
    { name: "option", targetElement: ".__zen__form__control__option" },
    { name: "option-checkbox", targetElement: ".__zen__form__control__options .__zen__form__control__option .__zen__form__control__checkbox" },
    { name: "option-checked", targetElement: ".__zen__form__control__options .__zen__form__control__option .__zen__form__control__checked" },
    { name: "option-selected", targetElement: ".__zen__form__control__options .__zen__form__control__selected" },
    { name: "option-hovered", targetElement: ".__zen__form__control__options .__zen__form__control__hovered" },
  ];
  
  variants.forEach((variant) => {
    addVariant(variant.name, createZenVariant(variant.name, variant.targetElement, e));
  });
});
