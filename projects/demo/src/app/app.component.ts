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
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapInput,
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
  toggleControl: FormControl = new FormControl({ value: false, disabled: false });
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
  ]

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
