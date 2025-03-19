import { Component, inject, OnInit } from '@angular/core';
import { ZapThemer } from 'zap';
import { ZapButton, ZapIconDirective } from 'zap/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [ZapButton, ZapIconDirective],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  private zapThemeService: ZapThemer = inject(ZapThemer);

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
