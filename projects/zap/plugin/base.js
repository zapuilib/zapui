const plugin = require("tailwindcss/plugin");

function createZapVariant(name, targetElement, e) {
  return ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`${name}${separator}${className}`)} ${targetElement}`;
    });
  };
}

module.exports = plugin(function ({ addVariant, e }) {
  const variants = [
    { name: "label", targetElement: "label" },
    { name: "input", targetElement: ".__zap__form__control__input" },
    { name: "input-placeholder", targetElement: ".__zap__form__control__input::placeholder" },
    { name: "error", targetElement: ".error" },
    { name: "dismiss", targetElement: ".handler" },
    { name: "textarea", targetElement: "textarea" },
    { name: "textarea-placeholder", targetElement: ".__zap__form__control__textarea::placeholder" },
    { name: "chip-text", targetElement: ".chip__text" },
    { name: "chip-icon", targetElement: ".chip__icon" },
    { name: 'help-text', targetElement: ".__zap__form__control__help__text" },
    { name: "dialog-title", targetElement: ".__zap__dialog__title" },
    { name: "dialog-content", targetElement: ".__zap__dialog__content p" },
    { name: "dialog-btn-primary", targetElement: ".__zap__dialog__footer .primary" },
    { name: "dialog-btn-secondary", targetElement: ".__zap__dialog__footer .secondary" },
    { name: "select", targetElement: ".__zap__form__control__select" },
    { name: "select-placeholder", targetElement: ".__zap__form__control__select .__zap__form__control__placeholder" },
    { name: "select-dropdown", targetElement: ".__zap__form__control__select .__zap__form__control__dropdown" },
    { name: "select-icon", targetElement: ".__zap__form__control__select .__zap__form__control__icon" },
    { name: "select-selected", targetElement: ".__zap__form__control__select .__zap__form__control__selected" },
    { name: "search", targetElement: ".__zap__form__control__search" },
    { name: "search-icon", targetElement: ".__zap__form__control__search__icon" },
    { name: "options", targetElement: ".__zap__form__control__options" },
    { name: "option", targetElement: ".__zap__form__control__option" },
    { name: "option-checkbox", targetElement: ".__zap__form__control__options .__zap__form__control__option .__zap__form__control__checkbox" },
    { name: "option-checked", targetElement: ".__zap__form__control__options .__zap__form__control__option .__zap__form__control__checked" },
    { name: "option-selected", targetElement: ".__zap__form__control__options .__zap__form__control__selected" },
    { name: "option-hovered", targetElement: ".__zap__form__control__options .__zap__form__control__hovered" },
  ];

  variants.forEach((variant) => {
    addVariant(variant.name, createZapVariant(variant.name, variant.targetElement, e));
  });
});
