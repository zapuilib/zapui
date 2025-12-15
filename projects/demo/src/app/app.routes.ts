import { Routes } from '@angular/router';

import { DocsLayout } from './layout/docs/docs.layout';
import { LandingLayout } from './layout/landing/landing.layout';

export const routes: Routes = [
  {
    path: 'docs',
    component: DocsLayout,
    children: [
      {
        path: 'getting-started',
        loadComponent: () =>
          import('./pages/getting-started/getting-started.component').then(
            (m) => m.GettingStartedComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: 'themes',
        loadComponent: () =>
          import('./pages/themes/themes.component').then((m) => m.ThemesComponent),
        pathMatch: 'full',
      },
      {
        path: 'changelog',
        loadComponent: () =>
          import('./pages/changelog/changelog.component').then((m) => m.ChangelogComponent),
        pathMatch: 'full',
      },
      {
        path: 'colors',
        loadComponent: () =>
          import('./pages/colors/colors.component').then((m) => m.ColorsComponent),
        pathMatch: 'full',
      },
      {
        path: 'theme-generator',
        loadComponent: () =>
          import('./pages/theme-generator/theme-generator.component').then(
            (m) => m.ThemeGeneratorComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: 'figma',
        loadComponent: () => import('./pages/figma/figma.component').then((m) => m.FigmaComponent),
        pathMatch: 'full',
      },
      {
        path: 'zapclass',
        loadComponent: () =>
          import('./pages/zapclass/zapclass.component').then((m) => m.ZapclassComponent),
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'getting-started',
      },
    ],
  },
  {
    path: 'components',
    component: DocsLayout,
    children: [
      {
        path: 'accordion',
        loadComponent: () =>
          import('./pages/accordion/accordion.component').then((m) => m.AccordionComponent),
        pathMatch: 'full',
      },
      {
        path: 'alert',
        loadComponent: () => import('./pages/alert/alert.component').then((m) => m.AlertComponent),
        pathMatch: 'full',
      },
      {
        path: 'badge',
        loadComponent: () => import('./pages/badge/badge.component').then((m) => m.BadgeComponent),
        pathMatch: 'full',
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/button/button.component').then((m) => m.ButtonComponent),
        pathMatch: 'full',
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./pages/checkbox/checkbox.component').then((m) => m.CheckboxComponent),
        pathMatch: 'full',
      },
      {
        path: 'chip',
        loadComponent: () => import('./pages/chip/chip.component').then((m) => m.ChipComponent),
        pathMatch: 'full',
      },
      {
        path: 'date-picker',
        loadComponent: () =>
          import('./pages/date-picker/date-picker.component').then((m) => m.DatePickerComponent),
        pathMatch: 'full',
      },
      {
        path: 'dialog',
        loadComponent: () =>
          import('./pages/dialog/dialog.component').then((m) => m.DialogComponent),
        pathMatch: 'full',
      },
      {
        path: 'input',
        loadComponent: () => import('./pages/input/input.component').then((m) => m.InputComponent),
        pathMatch: 'full',
      },
      {
        path: 'modal',
        loadComponent: () => import('./pages/modal/modal.component').then((m) => m.ModalComponent),
        pathMatch: 'full',
      },
      {
        path: 'radio',
        loadComponent: () => import('./pages/radio/radio.component').then((m) => m.RadioComponent),
        pathMatch: 'full',
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./pages/select/select.component').then((m) => m.SelectComponent),
        pathMatch: 'full',
      },
      {
        path: 'textarea',
        loadComponent: () =>
          import('./pages/textarea/textarea.component').then((m) => m.TextareaComponent),
        pathMatch: 'full',
      },
      {
        path: 'toggle',
        loadComponent: () =>
          import('./pages/toggle/toggle.component').then((m) => m.ToggleComponent),
        pathMatch: 'full',
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./pages/tooltip/tooltip.component').then((m) => m.TooltipComponent),
        pathMatch: 'full',
      },
      {
        path: 'toast',
        loadComponent: () => import('./pages/toast/toast.component').then((m) => m.ToastComponent),
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'accordion',
      },
    ],
  },
  {
    path: '',
    component: LandingLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
        pathMatch: 'full',
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./pages/examples/examples.component').then((m) => m.ExamplesComponent),
        pathMatch: 'full',
      },
    ],
  },
];
