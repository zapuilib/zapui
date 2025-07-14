# Changelog

## 📦 0.0.0-alpha.9.7 — `dev-alpha`

### 🛠 Fixes

- **Radio**
  Radio button fixed to support name

## 📦 0.0.0-alpha.9.5 — `dev-alpha`

### ✨ Features

- **Required Indicator for Form Fields**  
  All form fields now display a required indicator if the field is marked as `required`.  
  You can disable this by setting the `indicator` property to `false`.

### 🛠 Fixes

- **Global Dialog Button Configuration Fixed**  
  Global configuration for dialog buttons now behaves as expected.
- **Dropdown Expression Change Issue Resolved**  
  Fixed an issue where dropdowns caused `ExpressionChangedAfterItHasBeenCheckedError`.

- **Date Picker Sizing Works Properly**  
  The `size` property is now respected for the date picker component.

### 🚀 Enhancements

- **Signals for Inputs and Outputs**  
  All `@Input()` and `@Output()` decorators are now implemented using Angular **signals**.

- **Required `id` Property on Form Fields**  
  The `id` property is now mandatory on form field components — previously this triggered only a warning.

### ⚠️ Breaking Changes

- **Dropped Support for Angular 16 and 17**  
  This version no longer supports Angular 16 or 17.  
  Minimum supported version is now Angular 18.

## 0.0.0-alpha.9.4

- **Fix**: Checkbox checked property bug fix

## 0.0.0-alpha.9.3

- **Feature**: Checkbox now supports checked property

## 0.0.0-alpha.9.2

- **Enhanced**: Circular dependency fixed on accordion component
- **Feature**: Global configuration added for `error` messages.

## 0.0.0-alpha.9.1

- **Updated**: Default theme naming changeed for premium extensions

## 0.0.0-alpha.9

- **New**: Dropdown component added.
- **Feature**: Accessibility features added to components.
- **Feature**: Button now supports `focusColor` in global configuration.
- **Feature**: Alert, Chip, Modal, and Dialog now support `dismissFocusColor`.
- **Fixed**: Dismissible outlined chip color issue resolved.
- **Enhanced**: Accordion now supports `focusColor`.
- **Enhanced**: Select component now supports `optionFocusColor`.
- **Enhanced**: `dp-calendar` now supports `focusColor`.
- **Enhanced**: `dp-calendar-select` now supports `focusColor` and `optionFocusColor`.
- **Enhanced**: Toast component now supports `btnFocusColor`.
- **Changed**: Checkbox `borderFocusColor` renamed to `focusColor`.
- **Removed**: Checkbox `bgFocusColor` property removed.
- **Enhanced**: Toggle component now supports `focusColor`.
- **Feature**: Form fields now log a console warning if `id` is not provided.
- **Fix**: Dialog and Modal dismiss font-related configuration removed from global configuration; height and width properties added.
- **Enhanced**: Focus state updated across all components where required.
- **Fixed**: Date picker select range styling issue resolved.
- **Updated**: Date picker, Select, Dropdown, Dialog, Modal, and Tooltip now use Angular CDK for position handling. **Note**: Please download Angular CDK with `npm i @angular/cdk` to use the new version.

## 0.0.0-alpha.8 `latest`

- **Fixed**: Checkbox shape and size are now working correctly.
- **Fixed**: Input help text global styling is now working as expected.
- **Fixed**: Tooltip content element is now removed from the DOM on initialization, only visible on hover.
- **Fixed**: Global style for padding is fixed across all components.
- **Feature**: Checkbox `id` made required; shows warning if user does not provide `id`.
- **Feature**: Accessibility-related features such as `role`, `aria`, and `aria-labels` added to Checkbox.
- **Enhanced**: Accordion accessibility improved with additional `role`, `aria`, and `aria-labels` support.

## 0.0.0-alpha.7

- **Fixed**: Tooltip content position adjusted; now wrap removed as it will be based on user preference.
- **Fixed**: Global stylings are now working.
- **Enhanced**: Added check for valid `sizeValue` in `getSizeVariables` function.
- **Fixed**: Compact size for `select` now works with icon; removed `chip` padding Y for compact select.
- **Fixed**: Scrollarea is now working with date picker calendar.

## 0.0.0-alpha.6

- **Fixed**: Swipe is disabled for component-only toast elements.
- **Enhanced**: Removed padding and margin from title and text elements of toast component.

## 0.0.0-alpha.5

- **Fixed**: Maximum width of `18.75rem` used for toast text element starting from screen size `sm`.
- **Fixed**: Minimum width of `25rem` used for toast component starting from screen size `sm`.
- **New**: Added support for custom `duration` of the toast component.

## 0.0.0-alpha.4

- **Fixed**: Resolved console error related to Angular Control Value Accessor implementation.
- **Fixed**: Resolved Tailwind plugin configuration issues in demo application.
- **Enhanced**: Added customization support for dialog component's close and confirm button text.
- **New**: Introduced toast component with notification functionality.
- **New**: Toast service added with animated notification functionality. Currently implemented for toast components, with plans to extend to alerts in future releases.

## 0.0.0-alpha.3

- Latest release of alpha version.

## 0.0.0-alpha.2

- **Fixed**: Issue with `tailwind` base plugin not being able to find the CSS.

## 0.0.0-alpha.1

- **Initial Release**: Alpha release.
