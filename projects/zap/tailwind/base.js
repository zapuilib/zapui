const plugin = require('tailwindcss/plugin');

function createZapVariant(name, targetElement, e) {
  return ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      if (name === 'dp-calendar-multi') {
        return `.${e(`${name}${separator}${className}`)}, .${e(
          `${name}${separator}${className}`,
        )} ${targetElement}`;
      }
      return `.${e(`${name}${separator}${className}`)} ${targetElement}`;
    });
  };
}

module.exports = plugin(function ({ addVariant, e }) {
  const variants = [
    { name: 'label', targetElement: 'label' },
    { name: 'input', targetElement: '.__zap__form__control__input' },
    {
      name: 'input-placeholder',
      targetElement: '.__zap__form__control__input::placeholder',
    },
    { name: 'error', targetElement: '.error' },
    { name: 'dismiss', targetElement: '.handler' },
    { name: 'textarea', targetElement: 'textarea' },
    {
      name: 'textarea-placeholder',
      targetElement: '.__zap__form__control__textarea::placeholder',
    },
    { name: 'chip-text', targetElement: '.chip__text' },
    { name: 'chip-icon', targetElement: '.chip__icon' },
    { name: 'overlay', targetElement: '.__zap__overlay' },
    { name: 'help-text', targetElement: '.__zap__form__control__help__text' },
    { name: 'dialog-title', targetElement: '.__zap__dialog__title' },
    { name: 'dialog-content', targetElement: '.__zap__dialog__content p' },
    {
      name: 'dialog-btn-primary',
      targetElement: '.__zap__dialog__footer .primary',
    },
    {
      name: 'dialog-btn-secondary',
      targetElement: '.__zap__dialog__footer .secondary',
    },
    { name: 'select', targetElement: '.__zap__form__control__select' },
    {
      name: 'select-placeholder',
      targetElement: '.__zap__form__control__select .__zap__form__control__placeholder',
    },
    {
      name: 'select-dropdown',
      targetElement: '.__zap__form__control__select .__zap__form__control__dropdown',
    },
    {
      name: 'select-icon',
      targetElement: '.__zap__form__control__select .__zap__form__control__icon',
    },
    {
      name: 'select-selected',
      targetElement: '.__zap__form__control__select .__zap__form__control__selected',
    },
    { name: 'search', targetElement: '.__zap__form__control__search' },
    {
      name: 'search-icon',
      targetElement: '.__zap__form__control__search__icon',
    },
    { name: 'options', targetElement: '.__zap__form__control__options' },
    { name: 'option', targetElement: '.__zap__form__control__option' },
    {
      name: 'option-checkbox',
      targetElement:
        '.__zap__form__control__options .__zap__form__control__option .__zap__form__control__checkbox',
    },
    {
      name: 'option-checked',
      targetElement:
        '.__zap__form__control__options .__zap__form__control__option .__zap__form__control__checked',
    },
    {
      name: 'option-selected',
      targetElement: '.__zap__form__control__options .__zap__form__control__selected',
    },
    {
      name: 'option-hovered',
      targetElement: '.__zap__form__control__options .__zap__form__control__hovered',
    },
    { name: 'dp', targetElement: '.__zap__form__control__date__picker' },
    {
      name: 'dp-placeholder',
      targetElement: '.__zap__form__control__date__picker .__zap__form__control__placeholder',
    },
    {
      name: 'dp-icon',
      targetElement: '.__zap__form__control__date__picker .__zap__form__control__icon',
    },
    { name: 'dpc-container', targetElement: '.__zap__calendar__container' },
    { name: 'dpc', targetElement: '.__zap__calendar' },
    { name: 'dpc-day', targetElement: '.__zap__calendar .day' },
    {
      name: 'dpc-day-selected',
      targetElement: '.__zap__calendar .day.selected',
    },
    { name: 'dpc-today', targetElement: '.__zap__calendar .day.today' },
    {
      name: 'dpc-today-active',
      targetElement: '.__zap__calendar .day.today.this__month',
    },
    {
      name: 'dpc-day-active',
      targetElement: '.__zap__calendar .day.this__month',
    },
    {
      name: 'dpc-day-range',
      targetElement: '.__zap__calendar .day.in__range:not(.selected)',
    },
    {
      name: 'dpc-range-active',
      targetElement: '.__zap__calendar .day.in__range.this__month:not(.selected)',
    },
    {
      name: 'dpc-day-disabled',
      targetElement: '.__zap__calendar .day.is__disabled',
    },
    {
      name: 'dpc-button',
      targetElement: '.__zap__calendar .header button',
    },
    {
      name: 'toast-title',
      targetElement: '.__zap__toast__title',
    },
    {
      name: 'toast-text',
      targetElement: '.__zap__toast__text',
    },
    {
      name: 'toast-btn',
      targetElement: '.__zap__toast__actions .btn',
    },
  ];

  variants.forEach((variant) => {
    addVariant(variant.name, createZapVariant(variant.name, variant.targetElement, e));
  });
});
