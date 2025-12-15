import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ZapChip } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
  mode?: string;
}

@Component({
  selector: 'app-changelog',
  imports: [TitleComponent, SpacerComponent, RouterModule, ZapChip],
  templateUrl: './changelog.component.html',
  styleUrl: './changelog.component.scss',
})
export class ChangelogComponent {
  changelog: ChangelogEntry[] = [
    {
      version: '0.0.0-alpha.9.5',
      date: 'May 8, 2025',
      changes: [
        'Feature: Required indicator added for form fields, can be disabled via `indicator` property',
        'Fix: Global dialog button configuration now behaves as expected',
        'Fix: Dropdown expression change issue resolved',
        'Fix: Date picker `size` property now works as expected',
        'Enhanced: Inputs and Outputs updated to use Angular signals',
        'Enhanced: Form fields require `id` property (was previously just a warning)',
        'Breaking: Dropped support for Angular 16 and 17 — minimum supported is Angular 18',
      ],
    },
    {
      version: '0.0.0-alpha.9.4',
      date: 'May 1, 2025',
      changes: ['Fix: Checkbox `checked` property bug resolved'],
    },
    {
      version: '0.0.0-alpha.9.3',
      date: 'April 28, 2025',
      changes: ['Feature: Checkbox now supports `checked` property'],
    },
    {
      version: '0.0.0-alpha.9.2',
      date: 'April 24, 2025',
      changes: [
        'Enhanced: Circular dependency fixed in Accordion component',
        'Feature: Global configuration added for form `error` messages',
      ],
    },
    {
      version: '0.0.0-alpha.9.1',
      date: 'April 20, 2025',
      changes: ['Updated: Default theme naming changed for premium extensions'],
    },
    {
      version: '0.0.0-alpha.9',
      date: 'April 16, 2025',
      changes: [
        'New: Dropdown component added',
        'Feature: Accessibility improvements across components',
        'Feature: Button supports `focusColor` in global config',
        'Feature: Alert, Chip, Modal, Dialog support `dismissFocusColor`',
        'Fix: Outlined chip color issue resolved when dismissible',
        'Enhanced: Accordion supports `focusColor`',
        'Enhanced: Select component supports `optionFocusColor`',
        'Enhanced: `dp-calendar` and `dp-calendar-select` support focus styles',
        'Enhanced: Toast component supports `btnFocusColor`',
        'Changed: Checkbox `borderFocusColor` renamed to `focusColor`',
        'Removed: Checkbox `bgFocusColor` property removed',
        'Enhanced: Toggle supports `focusColor`',
        'Feature: Console warning added if form field `id` is missing',
        'Fix: Dialog and Modal dismiss font config removed, width/height added',
        'Enhanced: Focus state improved across all components',
        'Fix: Date picker select range styling issue resolved',
        'Updated: CDK positioning added for major components (install with `npm i @angular/cdk`)',
      ],
    },
    {
      version: '0.0.0-alpha.8',
      mode: 'Latest',
      date: 'March 25, 2024',
      changes: [
        'Fix: Checkbox shape and size now work correctly',
        'Fix: Input help text global styling fixed',
        'Fix: Tooltip element removed from DOM until hovered',
        'Fix: Global padding styles corrected across components',
        'Feature: Checkbox `id` made required, warning if missing',
        'Feature: Added accessibility support (`role`, `aria`, `aria-label`) to Checkbox',
        'Enhanced: Accordion accessibility improved with `role`, `aria`, `aria-labels`',
      ],
    },
    {
      version: '0.0.0-alpha.7',
      date: 'March 20, 2024',
      changes: [
        'Fix: Tooltip position adjustment, removed enforced wrapping',
        'Fix: Global styles now apply correctly',
        'Enhanced: Valid size check added in `getSizeVariables`',
        'Fix: Compact select now works with icon, chip padding adjusted',
        'Fix: Scroll area now works in date picker calendar',
      ],
    },
    {
      version: '0.0.0-alpha.6',
      date: 'March 12, 2024',
      changes: [
        'Latest release of alpha version',
        'Fixed: Swipe is disabled for component only toast elements',
        'Enhanced: Removed padding and marging from title and text elements of toast component',
      ],
    },
    {
      version: '0.0.0-alpha.5',
      date: 'March 11, 2024',
      changes: [
        'Fixed: Maximum width of `18.75rem` used for toast text element starting from screen size sm',
        'Fixed: Minimum width of `25rem` used for toast component starting from screen size sm',
        'New: Added support for custom `duration` of the toast component',
      ],
    },
    {
      version: '0.0.0-alpha.4',
      date: 'March 11, 2024',
      changes: [
        'Fixed: Resolved console error related to Angular Control Value Accessor implementation',
        'Fixed: Resolved Tailwind plugin configuration issues in demo application',
        "Enhanced: Added customization support for dialog component's close and confirm button text",
        'New: Introduced toast component with notification functionality',
        'New: Toast service added with animated notification functionality. Currently implemented for toast components, with plans to extend to alerts in future releases',
      ],
    },
    {
      version: '0.0.0-alpha.3',
      date: 'March 6, 2024',
      changes: ['Latest release of alpha version'],
    },
    {
      version: '0.0.0-alpha.2',
      date: 'March 5, 2024',
      changes: ['Fixed issue with `tailwind` base plugin not being able to find the css'],
    },
    {
      version: '0.0.0-alpha.1',
      date: 'March 4, 2024',
      changes: ['Alpha release'],
    },
  ];
}
