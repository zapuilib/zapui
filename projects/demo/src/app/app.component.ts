import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ZapTheme, ZapThemer } from 'zap';
import {
  ZapButtonComponent,
  ZapAlertComponent,
  ZapBadgeComponent,
  ZapChipComponent,
  ZapDialogComponent,
  ZapModalComponent
} from 'zap/core';
import { ZapInputComponent } from 'zap/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ZapAlertComponent,
    ZapBadgeComponent,
    ZapButtonComponent,
    ZapChipComponent,
    ZapDialogComponent,
    ZapModalComponent,
    ZapInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  usernameControl = new FormControl('', [Validators.required]);

  private zapThemeService: ZapThemer = inject(ZapThemer);

  // folly: ZapTheme = {
  //   colors: {
  //     primary: '#000000',
  //     secondary: '#FFFFFF',
  //     tertiary: '#F52F57',
  //     quaternary: '#9CA3AF',
  //     success: '#04E824',
  //     successText: '#000000',
  //     warning: '#f6ad55',
  //     warningText: '#000000',
  //     error: '#e3342f',
  //     errorText: '#FFFFFF',
  //     info: '#5438DC',
  //     infoText: '#FFFFFF',
  //   },
  //   fontSize: {
  //     '7xl': '4.5rem',
  //     '6xl': '3.75rem',
  //     '5xl': '3rem',
  //     '4xl': '2.25rem',
  //     '3xl': '1.875rem',
  //     '2xl': '1.5rem',
  //     xl: '1.25rem',
  //     lg: '1.125rem',
  //     md: '1rem',
  //     sm: '0.875rem',
  //     xs: '0.75rem',
  //     xxs: '0.625rem',
  //   },
  // };

  ngOnInit(): void {
    if(localStorage.getItem('zapdemo-theme') === null) {
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
