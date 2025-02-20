import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ZapThemer } from 'zap';
import {
  ZapButton,
  ZapAlert,
  ZapBadge,
  ZapChip,
  ZapDialog,
  ZapModal,
  ZapTooltip,
  ZapTooltipContent,
  ZapTooltipHandler,
  ZapAccordionGroup,
  ZapAccordionHeader,
  ZapAccordionContent,
  ZapAccordionItem,
  ZapIconDirective,
  ZapDialogButtonDirective,
} from 'zap/core';
import {
  ZapCheckbox,
  ZapDatePicker,
  ZapDatePickerBreakpoints,
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapInput,
  ZapLabelDirective,
  ZapRadio,
  ZapSelect,
  ZapTextarea,
  ZapToggle,
} from 'zap/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ZapAlert,
    ZapBadge,
    ZapButton,
    ZapChip,
    ZapDialog,
    ZapModal,
    ZapInput,
    ZapCheckbox,
    ZapRadio,
    ZapTextarea,
    ZapToggle,
    ZapTooltip,
    ZapTooltipHandler,
    ZapTooltipContent,
    ZapAccordionGroup,
    ZapAccordionHeader,
    ZapAccordionContent,
    ZapAccordionItem,
    ZapSelect,
    ZapIconDirective,
    ZapDialogButtonDirective,
    ZapFormFieldHelpTextDirective,
    ZapFormFieldIconDirective,
    ZapLabelDirective,
    ZapDatePicker
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  usernameControl = new FormControl({ value: '', disabled: false }, [
    Validators.required,
  ]);
  countryControl = new FormControl({ value: '', disabled: false }, [
    Validators.required,
  ]);
  checkboxControl = new FormControl({ value: true, disabled: true });
  toggleControl: FormControl = new FormControl({ value: false, disabled: false });
  datePickerControl = new FormControl({ value: new Date(new Date().setMonth(new Date().getMonth() + 1)), disabled: false }, []);
  // datePickerControl2 = new FormControl({ value: { startDate: new Date('2025-04-01'), endDate: new Date('2025-06-15') }, disabled: false }, []);
  // datePickerControl = new FormControl({ value: '', disabled: false }, []);
  datePickerControl2 = new FormControl({ value: '', disabled: false }, []);
  private zapThemeService: ZapThemer = inject(ZapThemer);
  accordions = [
    {
      title: 'Accordion 1',
      content: 'Content for Accordion 1',
    },
    {
      title: 'Accordion 2',
      content: 'Content for Accordion 2',
    },
    {
      title: 'Accordion 3',
      content: 'Content for Accordion 3',
    },
  ];
  breakpoints: ZapDatePickerBreakpoints = {
    default: {
      maxPerRow: 1,
      monthsPerView: 1,
    },
  };
  breakpoints2: ZapDatePickerBreakpoints = {
    default: {
      maxPerRow: 2,
      monthsPerView: 2,
    },
    'lg': {
      maxPerRow: 1,
      monthsPerView: 1,
    }
  };
  months: { label: string; value: string }[] = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  
  ngOnInit(): void {
    if (localStorage.getItem('zapdemo-theme') === null) {
      localStorage.setItem('zapdemo-theme', 'dark');
    }
    this.theme = localStorage.getItem('zapdemo-theme') as 'light' | 'dark';
    this.updateTheme();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('zapdemo-theme', this.theme);
    this.updateTheme();
  }

  private updateTheme(): void {
    this.zapThemeService.setTheme(this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
