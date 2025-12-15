import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZapButton, ZapChip, ZapInput } from 'zap';
import { ZapThemer } from 'zap';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { NAVIGATIONS_MOBILE } from '../../constants/navigations.constant';

@Component({
  selector: 'app-header',
  imports: [ZapInput, RouterModule, SidenavComponent, ZapChip, ZapButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  navigations: any[] = NAVIGATIONS_MOBILE;
  theme: string = 'dark';
  isMobileMenuOpen: boolean = false;

  private zapThemeService: ZapThemer = inject(ZapThemer);

  constructor() {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('zapdocs-theme') === null) {
        localStorage.setItem('zapdocs-theme', 'dark');
      } else {
        this.theme = localStorage.getItem('zapdocs-theme') as string;
      }
    }
    this.toggleThemeTo(this.theme);
    this.updateTheme();
  }

  toggleThemeTo(theme: string) {
    this.theme = theme;
    if (typeof window !== 'undefined') {
      document.documentElement.className = theme;
      localStorage.setItem('zapdocs-theme', this.theme);
    }
    this.updateTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.toggleBodyScroll(this.isMobileMenuOpen);
  }

  private toggleBodyScroll(isMenuOpen: boolean) {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private updateTheme(): void {
    this.zapThemeService.setTheme(this.theme);
  }

  openDonate() {
    window.open('https://github.com/sponsors/zapuilib');
  }
}
