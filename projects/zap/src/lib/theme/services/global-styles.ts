import { ZapTheme } from '../../interfaces/config.interface';
import { hexToRgba } from '../utils/base-theme-utils';

/**
 * This function generates the global styles for the all the components
 * @param theme
 * @param root
 * @returns
 */
export function generateGlobalStylesVariables(theme: ZapTheme): string {
  let cssVariables = '';
  const styles = {
    alert: [
      {
        label: 'bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.primary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.primary, 0.7),
      },
      {
        label: 'padding-left',
        value: '1rem',
      },
      {
        label: 'padding-right',
        value: '1rem',
      },
      {
        label: 'padding-top',
        value: '1rem',
      },
      {
        label: 'padding-bottom',
        value: '1rem',
      },
      {
        label: 'font-size',
        value: '1rem',
      },
      {
        label: 'icon-height',
        value: '1rem',
      },
      {
        label: 'icon-width',
        value: '1rem',
      },
      {
        label: 'dismiss-icon-width',
        value: '1rem',
      },
      {
        label: 'dismiss-icon-height',
        value: '1rem',
      },
    ],
    badge: [
      {
        label: 'bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'border-radius',
        value: 'calc(infinity * 1px)',
      },
      {
        label: 'padding-left',
        value: '0rem',
      },
      {
        label: 'padding-right',
        value: '0rem',
      },
      {
        label: 'padding-top',
        value: '0rem',
      },
      {
        label: 'padding-bottom',
        value: '0rem',
      },
      {
        label: 'font-size',
        value: '0.875rem',
      },
      {
        label: 'width',
        value: '1.5rem',
      },
      {
        label: 'height',
        value: '1.5rem',
      },
    ],
    button: [
      {
        label: 'bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'bg-hover-color',
        value: hexToRgba(theme.colors.tertiary, 0.9),
      },
      {
        label: 'text-hover-color',
        value: hexToRgba(theme.colors.primary, 0.9),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.tertiary, 0),
      },
      {
        label: 'bg-active-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-active-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-active-color',
        value: 'transparent',
      },
      {
        label: 'disabled-bg-color',
        value: hexToRgba(theme.colors.tertiary, 0.5),
      },
      {
        label: 'disabled-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'disabled-border-color',
        value: hexToRgba(theme.colors.tertiary, 0),
      },
      {
        label: 'padding-left',
        value: '1rem',
      },
      {
        label: 'padding-right',
        value: '1rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'font-size',
        value: '1rem',
      },
    ],
    chip: [
      {
        label: 'bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'bg-hover-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-hover-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-hover-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.primary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.primary, 0.7),
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '0.75rem',
      },
      {
        label: 'padding-top',
        value: '0.25rem',
      },
      {
        label: 'padding-bottom',
        value: '0.25rem',
      },
      {
        label: 'font-size',
        value: '0.875rem',
      },
      {
        label: 'dismiss-height',
        value: '0.875rem',
      },
      {
        label: 'dismiss-width',
        value: '0.875rem',
      },
    ],
    dialog: [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'title-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.7),
      },
      {
        label: 'primary-btn-bg-color',
        value: theme.colors.error,
      },
      {
        label: 'primary-btn-border-color',
        value: theme.colors.error,
      },
      {
        label: 'primary-btn-text-color',
        value: theme.colors.errorText,
      },
      {
        label: 'primary-btn-bg-hover-color',
        value: hexToRgba(theme.colors.error, 0.9),
      },
      {
        label: 'primary-btn-border-hover-color',
        value: hexToRgba(theme.colors.error, 0.9),
      },
      {
        label: 'primary-btn-text-hover-color',
        value: hexToRgba(theme.colors.errorText, 0.9),
      },
      {
        label: 'secondary-btn-bg-color',
        value: 'transparent',
      },
      {
        label: 'secondary-btn-border-color',
        value: hexToRgba(theme.colors.secondary, 0.15),
      },
      {
        label: 'secondary-btn-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'secondary-btn-bg-hover-color',
        value: 'transparent',
      },
      {
        label: 'secondary-btn-border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.2),
      },
      {
        label: 'secondary-btn-text-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.8),
      },
      {
        label: 'overlay-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'padding-left',
        value: '1.25rem',
      },
      {
        label: 'padding-right',
        value: '1.25rem',
      },
      {
        label: 'padding-top',
        value: '1.25rem',
      },
      {
        label: 'padding-bottom',
        value: '1.25rem',
      },
      {
        label: 'title-font-size',
        value: '1.25rem',
      },
      {
        label: 'title-font-weight',
        value: '600',
      },
      {
        label: 'dismiss-font-size',
        value: '1rem',
      },
      {
        label: 'font-size',
        value: '1rem',
      },
      {
        label: 'dismiss-font-weight',
        value: '600',
      },
      {
        label: 'font-weight',
        value: '400',
      },
      {
        label: 'dismiss-height',
        value: '1rem',
      },
      {
        label: 'dismiss-width',
        value: '1rem',
      },
    ],
    modal: [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.7),
      },
      {
        label: 'overlay-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'padding-left',
        value: '1.25rem',
      },
      {
        label: 'padding-right',
        value: '1.25rem',
      },
      {
        label: 'padding-top',
        value: '1.25rem',
      },
      {
        label: 'padding-bottom',
        value: '1.25rem',
      },
      {
        label: 'dismiss-font-size',
        value: '1rem',
      },
      {
        label: 'dismiss-font-weight',
        value: '400',
      },
      {
        label: 'max-width',
        value: '100%',
      },
      {
        label: 'dismiss-height',
        value: '1rem',
      },
      {
        label: 'dismiss-width',
        value: '1rem',
      },
    ],
    input: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'placeholder-color',
        value: hexToRgba(theme.colors.secondary, 1),
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 1),
      },
      {
        label: 'help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '0.75rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'width',
        value: '100%',
      },
      {
        label: 'icon-font-size',
        value: '1rem',
      },
      {
        label: 'icon-line-height',
        value: 'auto',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
    ],
    checkbox: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'border-color',
        value: theme.colors.secondary,
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'bg-checked-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-checked-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-checked-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'bg-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'text-focus-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'width',
        value: '1.25rem',
      },
      {
        label: 'height',
        value: '1.25rem',
      },
      {
        label: 'padding-left',
        value: '0.5rem',
      },
      {
        label: 'padding-right',
        value: '0.5rem',
      },
      {
        label: 'padding-top',
        value: '0.25rem',
      },
      {
        label: 'padding-bottom',
        value: '0.25rem',
      },
      {
        label: 'border-width',
        value: '0.125rem',
      },
    ],
    radio: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'border-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'bg-checked-color',
        value: 'transparent',
      },
      {
        label: 'checked-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'border-checked-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'width',
        value: '1.25rem',
      },
      {
        label: 'height',
        value: '1.25rem',
      },
    ],
    textarea: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'placeholder-color',
        value: hexToRgba(theme.colors.secondary, 1),
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '0.75rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'width',
        value: '100%',
      },
      {
        label: 'icon-font-size',
        value: '0.875rem',
      },
      {
        label: 'icon-line-height',
        value: 'auto',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
    ],
    toggle: [
      {
        label: 'bg-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'roller-color',
        value: theme.colors.primary,
      },
      {
        label: 'bg-on-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'border-on-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'roller-on-color',
        value: theme.colors.primary,
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'height',
        value: '1.5rem',
      },
      {
        label: 'width',
        value: '2.75rem',
      },
      {
        label: 'roller-height',
        value: '1rem',
      },
      {
        label: 'roller-width',
        value: '1rem',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
      {
        label: 'roller-offset',
        value: '0.325rem',
      },
    ],
    accordion: [
      {
        label: 'item-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'header-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'header-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'header-icon-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'content-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'header-padding-top',
        value: '0.75rem',
      },
      {
        label: 'header-padding-bottom',
        value: '0.75rem',
      },
      {
        label: 'content-padding-top',
        value: '0.25rem',
      },
      {
        label: 'content-padding-bottom',
        value: '1rem',
      },
    ],
    select: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'placeholder-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'options-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'options-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'search-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'search-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'search-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'search-border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'search-icon-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'search-placeholder-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'no-options-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'no-options-text-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'no-options-border-color',
        value: 'transparent',
      },
      {
        label: 'no-options-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'chip-bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'chip-text-color',
        value: theme.colors.primary,
      },
      {
        label: 'chip-border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'chip-dismiss-color',
        value: theme.colors.primary,
      },
      {
        label: 'chip-dismiss-hover-color',
        value: hexToRgba(theme.colors.primary, 0.7),
      },
      {
        label: 'checkbox-bg-color',
        value: 'transparent',
      },
      {
        label: 'checkbox-border-color',
        value: theme.colors.secondary,
      },
      {
        label: 'checkbox-checked-bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'checkbox-checked-border-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'checkbox-checked-color',
        value: theme.colors.primary,
      },
      {
        label: 'option-bg-color',
        value: 'transparent',
      },
      {
        label: 'option-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'option-border-color',
        value: 'transparent',
      },
      {
        label: 'option-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.03),
      },
      {
        label: 'option-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'option-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-border-color',
        value: 'transparent',
      },
      {
        label: 'selected-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.03),
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'search-ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'selected-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'selected-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'search-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 1),
      },
      {
        label: 'help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '1.325rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'search-padding-left',
        value: '2.25rem',
      },
      {
        label: 'search-padding-right',
        value: '0.5rem',
      },
      {
        label: 'search-padding-top',
        value: '0.5rem',
      },
      {
        label: 'search-padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'font-size',
        value: '1rem',
      },
      {
        label: 'option-padding-left',
        value: '0.75rem',
      },
      {
        label: 'option-padding-right',
        value: '0.75rem',
      },
      {
        label: 'option-padding-top',
        value: '0.5rem',
      },
      {
        label: 'option-padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'chip-padding-left',
        value: '0.5rem',
      },
      {
        label: 'chip-padding-right',
        value: '1.25rem',
      },
      {
        label: 'chip-padding-top',
        value: '0.12rem',
      },
      {
        label: 'chip-padding-bottom',
        value: '0.12rem',
      },
      {
        label: 'chip-font-size',
        value: '0.875rem',
      },
      {
        label: 'chip-dismiss-font-size',
        value: '0.75rem',
      },
      {
        label: 'checkbox-width',
        value: '1.25rem',
      },
      {
        label: 'checkbox-height',
        value: '1.25rem',
      },
      {
        label: 'checkbox-padding-left',
        value: '0.5rem',
      },
      {
        label: 'checkbox-padding-right',
        value: '0.5rem',
      },
      {
        label: 'checkbox-padding-top',
        value: '0.25rem',
      },
      {
        label: 'checkbox-padding-bottom',
        value: '0.25rem',
      },
      {
        label: 'checkbox-border-width',
        value: '0.125rem',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
      {
        label: 'icon-font-size',
        value: '1rem',
      },
      {
        label: 'checkbox-checked-height',
        value: '1rem',
      },
      {
        label: 'checkbox-checked-width',
        value: '1rem',
      },
      {
        label: 'chip-dismiss-height',
        value: '0.725rem',
      },
      {
        label: 'chip-dismiss-width',
        value: '0.725rem',
      },
    ],
    tooltip: [
      {
        label: 'content-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'content-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'content-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'content-padding-left',
        value: '0.5rem',
      },
      {
        label: 'content-padding-right',
        value: '0.5rem',
      },
      {
        label: 'content-padding-top',
        value: '0.25rem',
      },
      {
        label: 'content-padding-bottom',
        value: '0.25rem',
      },
    ],
    'date-picker': [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'placeholder-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 1),
      },
      {
        label: 'help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'disabled-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'disabled-bg-color',
        value: 'transparent',
      },
      {
        label: 'disabled-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'disabled-help-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '0.75rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'font-size',
        value: '0.5rem',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
      {
        label: 'icon-font-size',
        value: '1rem',
      },
    ],
    'dp-calendar': [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'title-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'handler-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'handler-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'handler-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'handler-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'handler-border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'day-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'day-of-week-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'day-of-week-text-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'day-active-month-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'day-active-month-bg-color',
        value: 'transparent',
      },
      {
        label: 'day-active-month-border-color',
        value: 'transparent',
      },
      {
        label: 'day-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.03),
      },
      {
        label: 'day-active-month-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'day-border-color',
        value: 'transparent',
      },
      {
        label: 'day-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'today-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'today-border-color',
        value: 'transparent',
      },
      {
        label: 'today-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'today-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'in-range-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'in-range-active-month-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'in-range-border-color',
        value: 'transparent',
      },
      {
        label: 'in-range-active-month-border-color',
        value: 'transparent',
      },
      {
        label: 'in-range-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'in-range-active-month-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'selected-active-month-bg-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'selected-active-month-border-color',
        value: 'transparent',
      },
      {
        label: 'selected-active-month-text-color',
        value: theme.colors.primary,
      },
      {
        label: 'selected-active-month-bg-hover-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'selected-active-month-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-active-month-text-hover-color',
        value: theme.colors.primary,
      },
      {
        label: 'selected-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'selected-border-color',
        value: 'transparent',
      },
      {
        label: 'selected-text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'selected-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'selected-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-text-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'handler-height',
        value: '1rem',
      },
      {
        label: 'handler-width',
        value: '1rem',
      },
      {
        label: 'day-height',
        value: '2.65rem',
      },
      {
        label: 'day-width',
        value: '2.65rem',
      },
      {
        label: 'day-of-week-height',
        value: '2.5rem',
      },
      {
        label: 'day-of-week-width',
        value: '2.5rem',
      },
      {
        label: 'padding-top',
        value: '0.5rem',
      },
      {
        label: 'padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'padding-left',
        value: '0.25rem',
      },
      {
        label: 'padding-right',
        value: '0.25rem',
      },
      {
        label: 'handler-padding-left',
        value: '0.5rem',
      },
      {
        label: 'handler-padding-right',
        value: '0.5rem',
      },
      {
        label: 'handler-padding-top',
        value: '0.5rem',
      },
      {
        label: 'handler-padding-bottom',
        value: '0.5rem',
      },
    ],
    'dp-calendar-select': [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'label-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'placeholder-color',
        value: theme.colors.secondary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'options-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'options-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'option-bg-color',
        value: 'transparent',
      },
      {
        label: 'option-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'option-border-color',
        value: 'transparent',
      },
      {
        label: 'option-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.03),
      },
      {
        label: 'option-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'option-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-bg-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'selected-border-color',
        value: 'transparent',
      },
      {
        label: 'selected-border-hover-color',
        value: 'transparent',
      },
      {
        label: 'selected-bg-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.05),
      },
      {
        label: 'ring-focus-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'selected-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'selected-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'search-bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'padding-left',
        value: '0.75rem',
      },
      {
        label: 'padding-right',
        value: '2rem',
      },
      {
        label: 'padding-top',
        value: '0.375rem',
      },
      {
        label: 'padding-bottom',
        value: '0.375rem',
      },
      {
        label: 'search-padding-left',
        value: '2.25rem',
      },
      {
        label: 'search-padding-right',
        value: '0.5rem',
      },
      {
        label: 'search-padding-top',
        value: '0.5rem',
      },
      {
        label: 'search-padding-bottom',
        value: '0.5rem',
      },
      {
        label: 'font-size',
        value: '0.875rem',
      },
      {
        label: 'option-font-size',
        value: '0.875rem',
      },
      {
        label: 'option-padding-left',
        value: '0.5rem',
      },
      {
        label: 'option-padding-right',
        value: '0.5rem',
      },
      {
        label: 'option-padding-top',
        value: '0.375rem',
      },
      {
        label: 'option-padding-bottom',
        value: '0.375rem',
      },
      {
        label: 'chip-padding-left',
        value: '0.5rem',
      },
      {
        label: 'chip-padding-right',
        value: '1.25rem',
      },
      {
        label: 'chip-padding-top',
        value: '0.12rem',
      },
      {
        label: 'chip-padding-bottom',
        value: '0.12rem',
      },
      {
        label: 'chip-font-size',
        value: '0.875rem',
      },
      {
        label: 'chip-dismiss-font-size',
        value: '0.75rem',
      },
      {
        label: 'checkbox-width',
        value: '1.25rem',
      },
      {
        label: 'checkbox-height',
        value: '1.25rem',
      },
      {
        label: 'checkbox-padding-left',
        value: '0.5rem',
      },
      {
        label: 'checkbox-padding-right',
        value: '0.5rem',
      },
      {
        label: 'checkbox-padding-top',
        value: '0.25rem',
      },
      {
        label: 'checkbox-padding-bottom',
        value: '0.25rem',
      },
      {
        label: 'checkbox-border-width',
        value: '0.125rem',
      },
      {
        label: 'help-text-font-size',
        value: '0.875rem',
      },
      {
        label: 'icon-font-size',
        value: '1rem',
      },
      {
        label: 'selected-font-size',
        value: '0.875rem',
      },
    ],
    toast: [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'title-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'btn-border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'btn-border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.2),
      },
      {
        label: 'btn-text-color',
        value: hexToRgba(theme.colors.secondary, 0.8),
      },
      {
        label: 'btn-text-hover-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.3),
      },
      {
        label: 'padding-left',
        value: '1.25rem',
      },
      {
        label: 'padding-right',
        value: '2rem',
      },
      {
        label: 'padding-top',
        value: '1rem',
      },
      {
        label: 'padding-bottom',
        value: '1rem',
      },
      {
        label: 'btn-padding-left',
        value: '0.75rem',
      },
      {
        label: 'btn-padding-right',
        value: '0.75rem',
      },
      {
        label: 'btn-padding-top',
        value: '0.375rem',
      },
      {
        label: 'btn-padding-bottom',
        value: '0.375rem',
      },
      {
        label: 'font-size',
        value: '0.875rem',
      },
      {
        label: 'btn-font-size',
        value: '0.875rem',
      },
    ],
  };
  for (const [component, stylesArray] of Object.entries(styles)) {
    for (const style of stylesArray) {
      const styleExist = style['value'];
      cssVariables += `--zap-${component}-${style['label']}: ${styleExist};\n`;
    }
  }

  return cssVariables;
}
