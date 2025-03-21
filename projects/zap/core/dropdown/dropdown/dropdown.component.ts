import { Component, ContentChild } from '@angular/core';

import { ZapDropdownMenu } from '../dropdown-menu/dropdown-menu.component';
import { ZapDropdownTrigger } from '../dropdown-trigger/dropdown-trigger.component';

@Component({
  selector: 'zap-dropdown',
  standalone: true,
  imports: [],
  template: `
    <div class="relative">
      <div>
        <ng-content select="zap-dropdown-trigger"></ng-content>
      </div>
      <div [style.display]="isMenuOpen ? 'block' : 'none'">
        <ng-content select="zap-dropdown-menu"></ng-content>
      </div>
    </div>
  `,
  styleUrl: './dropdown.component.scss',
})
export class ZapDropdown {
  @ContentChild(ZapDropdownMenu) menu!: ZapDropdownMenu;
  @ContentChild(ZapDropdownTrigger) trigger!: ZapDropdownTrigger;
  isMenuOpen = false;

  private adjustPosition() {
    if (typeof window === 'undefined') return;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
