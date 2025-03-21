import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-portal',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
  styleUrl: './dropdown-menu-portal.component.scss',
})
export class ZapDropdownMenuPortal {}
