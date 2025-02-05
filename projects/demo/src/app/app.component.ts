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
import { ZapCheckboxComponent, ZapInputComponent, ZapRadio } from 'zap/forms';

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
    ZapInputComponent,
    ZapCheckboxComponent,
    ZapRadio
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  usernameControl = new FormControl('', [Validators.required]);

  private zapThemeService: ZapThemer = inject(ZapThemer);

  ngOnInit(): void {
    if(localStorage.getItem('zapdemo-theme') === null) {
      localStorage.setItem('zapdemo-theme', 'dark');
    }
    this.theme = localStorage.getItem('zapdemo-theme') as 'light' | 'dark' ;
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
