import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { DemoButtonComponent } from './components/button/button.component';
import { DemoAlertComponent } from './components/alert/alert.component';
import { DemoBadgeComponent } from './components/badge/badge.component';
import { DemoInputComponent } from './components/input/input.component';
import { DemoSelectComponent } from './components/select/select.component';

@Component({
  selector: 'app-theme-generator',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DemoButtonComponent,
    PreviewCodeComponent,
    DemoAlertComponent,
    DemoBadgeComponent,
    DemoInputComponent,
    DemoSelectComponent,
  ],
  templateUrl: './theme-generator.component.html',
  styleUrl: './theme-generator.component.scss',
})
export class ThemeGeneratorComponent implements OnInit {
  private sub: Subscription = new Subscription();
  form!: FormGroup;
  darkTheme = {
    primary: '#09090B',
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',
    success: '#22c55e',
    successText: '#09090B',
    warning: '#eab308',
    warningText: '#09090B',
    error: '#dc2626',
    errorText: '#FFFFFF',
    info: '#2563eb',
    infoText: '#FFFFFF',
  };

  lightTheme = {
    primary: '#FFFFFF',
    secondary: '#09090B',
    tertiary: '#09090B',
    success: '#22c55e',
    successText: '#09090B',
    warning: '#eab308',
    warningText: '#09090B',
    error: '#dc2626',
    errorText: '#FFFFFF',
    info: '#2563eb',
    infoText: '#FFFFFF',
  };

  markdown: { title: string; markdown: string; language: string } = {
    title: 'Theme',
    markdown: this.generateMarkdown({
      primary: '#09090B',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
      success: '#22c55e',
      successText: '#09090B',
      warning: '#eab308',
      warningText: '#09090B',
      error: '#dc2626',
      errorText: '#FFFFFF',
      info: '#2563eb',
      infoText: '#FFFFFF',
    }),
    language: 'typescript',
  };
  theme: string = 'dark';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.createForm();
    this.watchForm();
    this.watchThemeChange();
  }

  private createForm() {
    this.theme = typeof window !== 'undefined' ? document.documentElement.className : 'dark';

    const themeValues = this.theme === 'dark' ? this.darkTheme : this.lightTheme;

    this.form = this.fb.group({
      primary: [themeValues.primary],
      secondary: [themeValues.secondary],
      tertiary: [themeValues.tertiary],
      success: [themeValues.success],
      successText: [themeValues.successText],
      warning: [themeValues.warning],
      warningText: [themeValues.warningText],
      error: [themeValues.error],
      errorText: [themeValues.errorText],
      info: [themeValues.info],
      infoText: [themeValues.infoText],
    });
  }

  private watchThemeChange() {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.className;
      const themeValues = theme === 'dark' ? this.darkTheme : this.lightTheme;
      this.form.patchValue(themeValues);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    this.sub.add({
      unsubscribe() {
        observer.disconnect();
      },
    });
  }

  private watchForm() {
    this.sub.add(
      this.form.valueChanges.subscribe((values) => {
        this.markdown.markdown = this.generateMarkdown(values);
        this.adjustRootStyles();
      }),
    );
  }

  private generateMarkdown(values: any): string {
    return `import { ZapTheme } from 'zap';

  export const customTheme: ZapTheme = {
    colors: {
      primary: '${values.primary.toUpperCase()}',
      secondary: '${values.secondary.toUpperCase()}',
      tertiary: '${values.tertiary.toUpperCase()}',
      success: '${values.success.toUpperCase()}',
      successText: '${values.successText.toUpperCase()}',
      warning: '${values.warning.toUpperCase()}',
      warningText: '${values.warningText.toUpperCase()}',
      error: '${values.error.toUpperCase()}',
      errorText: '${values.errorText.toUpperCase()}',
      info: '${values.info.toUpperCase()}',
      infoText: '${values.infoText.toUpperCase()}',
    },
      fontSize: {
      '5xl': '3rem',
      '4xl': '2.25rem',
      '3xl': '1.875rem',
      '2xl': '1.5rem',
      xl: '1.25rem',
      lg: '1.125rem',
      md: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
      xxs: '0.625rem',
    },
  };
    `;
  }

  private hexToRgb(hex: string): string {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r}, ${g}, ${b}`;
  }

  private hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex?.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  adjustRootStyles() {
    if (typeof window !== undefined) {
      const rootStyles = document.documentElement.style;
      // Base colors
      rootStyles.setProperty('--zap-color-primary', this.hexToRgb(this.form.value.primary));
      rootStyles.setProperty('--zap-color-secondary', this.hexToRgb(this.form.value.secondary));
      rootStyles.setProperty('--zap-color-tertiary', this.hexToRgb(this.form.value.tertiary));
      rootStyles.setProperty('--zap-color-success', this.hexToRgb(this.form.value.success));
      rootStyles.setProperty(
        '--zap-color-success-text',
        this.hexToRgb(this.form.value.successText),
      );
      rootStyles.setProperty('--zap-color-warning', this.hexToRgb(this.form.value.warning));
      rootStyles.setProperty(
        '--zap-color-warning-text',
        this.hexToRgb(this.form.value.warningText),
      );
      rootStyles.setProperty('--zap-color-error', this.hexToRgb(this.form.value.error));
      rootStyles.setProperty('--zap-color-error-text', this.hexToRgb(this.form.value.errorText));
      rootStyles.setProperty('--zap-color-info', this.hexToRgb(this.form.value.info));
      rootStyles.setProperty('--zap-color-info-text', this.hexToRgb(this.form.value.infoText));

      // Button colors
      rootStyles.setProperty('--zap-button-bg-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-button-border-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-button-text-color', this.form.value.primary);

      //Alert colors
      rootStyles.setProperty('--zap-alert-bg-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-alert-border-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-alert-text-color', this.form.value.primary);

      //Badge colors
      rootStyles.setProperty('--zap-badge-bg-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-badge-border-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-badge-text-color', this.form.value.primary);

      //Input colors
      rootStyles.setProperty(
        '--zap-input-border-color',
        this.hexToRgba(this.form.value.secondary, 0.1),
      );
      rootStyles.setProperty('--zap-input-ring-focus-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-input-border-focus-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-input-text-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-input-text-focus-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-input-icon-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-input-label-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-input-placeholder-color', this.form.value.secondary);
      rootStyles.setProperty(
        '--zap-input-help-text-color',
        this.hexToRgba(this.form.value.secondary, 0.5),
      );

      //Select colors
      rootStyles.setProperty(
        '--zap-select-border-color',
        this.hexToRgba(this.form.value.secondary, 0.1),
      );
      rootStyles.setProperty(
        '--zap-select-border-hover-color',
        this.hexToRgba(this.form.value.secondary, 0.1),
      );
      rootStyles.setProperty('--zap-select-ring-focus-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-select-border-focus-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-select-text-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-text-hover-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-text-focus-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-icon-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-icon-hover-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-label-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-placeholder-color', this.form.value.secondary);
      rootStyles.setProperty(
        '--zap-select-help-text-color',
        this.hexToRgba(this.form.value.secondary, 0.5),
      );
      rootStyles.setProperty(
        '--zap-select-options-border-color',
        this.hexToRgba(this.form.value.secondary, 0.1),
      );
      rootStyles.setProperty(
        '--zap-select-no-options-text-color',
        this.hexToRgba(this.form.value.secondary, 0.5),
      );
      rootStyles.setProperty(
        '--zap-select-no-options-text-hover-color',
        this.hexToRgba(this.form.value.secondary, 0.5),
      );
      rootStyles.setProperty(
        '--zap-select-search-border-color',
        this.hexToRgba(this.form.value.secondary, 0.2),
      );
      rootStyles.setProperty(
        '--zap-select-search-border-hover-color',
        this.hexToRgba(this.form.value.secondary, 0.2),
      );
      rootStyles.setProperty(
        '--zap-select-search-placeholder-color',
        this.hexToRgba(this.form.value.secondary, 0.5),
      );
      rootStyles.setProperty('--zap-select-search-text-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-search-text-hover-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-search-icon-color', this.form.value.secondary);

      rootStyles.setProperty('--zap-select-option-text-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-option-text-hover-color', this.form.value.secondary);
      rootStyles.setProperty(
        '--zap-select-option-bg-hover-color',
        this.hexToRgba(this.form.value.secondary, 0.05),
      );
      rootStyles.setProperty(
        '--zap-select-selected-bg-hover-color',
        this.hexToRgba(this.form.value.secondary, 0.05),
      );
      rootStyles.setProperty('--zap-select-selected-text-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-selected-text-hover-color', this.form.value.secondary);
      rootStyles.setProperty('--zap-select-checkbox-border-color', this.form.value.secondary);
      rootStyles.setProperty(
        '--zap-select-checkbox-checked-border-color',
        this.form.value.tertiary,
      );
      rootStyles.setProperty('--zap-select-checkbox-checked-color', this.form.value.primary);
      rootStyles.setProperty('--zap-select-checkbox-checked-bg-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-select-chip-bg-color', this.form.value.tertiary);
      rootStyles.setProperty('--zap-select-chip-text-color', this.form.value.primary);
    }
  }
}
