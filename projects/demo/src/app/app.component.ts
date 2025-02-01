import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ZenTheme, ZenThemer } from 'ngx-zen';
import {
  ZenButtonComponent,
  ZenAlertComponent,
  ZenBadgeComponent,
  ZenChipComponent,
  ZenDialogComponent,
  ZenModalComponent
} from 'ngx-zen/core';
import { ZenInputComponent } from 'ngx-zen/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ZenAlertComponent,
    ZenBadgeComponent,
    ZenButtonComponent,
    ZenChipComponent,
    ZenDialogComponent,
    ZenModalComponent,
    ZenInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  theme: 'light' | 'dark' | 'folly' = 'dark';
  usernameControl = new FormControl('', [Validators.required]);

  private zenThemeService: ZenThemer = inject(ZenThemer);

  folly: ZenTheme = {
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      tertiary: '#F52F57',
      quaternary: '#9CA3AF',
      success: '#04E824',
      successText: '#000000',
      warning: '#f6ad55',
      warningText: '#000000',
      error: '#e3342f',
      errorText: '#FFFFFF',
      info: '#5438DC',
      infoText: '#FFFFFF',
    },
    fontSize: {
      '7xl': '4.5rem',
      '6xl': '3.75rem',
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

  ngOnInit(): void {
    if(localStorage.getItem('zendemo-theme') === null) {
      localStorage.setItem('zendemo-theme', 'dark');
    }
    this.theme = localStorage.getItem('zendemo-theme') as 'light' | 'dark' | 'folly';
    if (this.theme === 'folly') {
      this.zenThemeService.setTheme(this.folly);
    } else {
      this.zenThemeService.setTheme(this.theme);
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'folly' : 'dark';
    localStorage.setItem('zendemo-theme', this.theme);
    if (this.theme === 'folly') {
      this.zenThemeService.setTheme(this.folly);
    } else {
      this.zenThemeService.setTheme(this.theme);
    }
  }
}
